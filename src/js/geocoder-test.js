import geojsonTidy from '@mapbox/geojson-tidy';
import axios from 'axios';
const geocoderUrl = `https://api.mapbox.com/matching/v4/mapbox.driving.json?access_token=${window.mapbox.key}`;


// Get route data
const fixture = require('./fixtures/walk-around-the-block');


// Remove elevation data, the geocoder API doesn't like it
const fixtureWithoutElevation = removeElevationFromCoordinates(fixture);
const start = fixtureWithoutElevation.features[0].geometry.coordinates[0];
window.map.panTo(start);


// Pre-process
const fixtureTidied = geojsonTidy.tidy(fixtureWithoutElevation, {
    minimumDistance: 10, // Minimum distance between points in metres
    minimumTime: 5,      // Minimum time interval between points in seconds
    maximumPoints: 100   // Maximum points in a feature (100 point limit on Map Matching geocoder step)
});


// Send requests to geocoder
const geocoderRequests = fixtureTidied.features.map(f => axios.post(geocoderUrl, f));


// Get all geocoder responses and draw them on the map
axios.all(geocoderRequests).then(responses => {
    const geocodedGeojson = geocoderResponsesToGeojson(responses);
    let animatedGeojson = require('./fixtures/empty')(start);
    window.map.addSource('line-animation', { type: 'geojson', data: animatedGeojson });
    setupLineAnimationLayers();

    document.addEventListener('scroll', () => {
        const maxIndex = Math.floor(geocodedGeojson.features[0].geometry.coordinates.length * getNormalizedScrollPosition());
        if (maxIndex > 0) {
            animatedGeojson.features[0].geometry.coordinates = geocodedGeojson.features[0].geometry.coordinates.slice(0, maxIndex);
            window.map.getSource('line-animation').setData(animatedGeojson);
        }

        const lastIndex = animatedGeojson.features[0].geometry.coordinates.length - 1;
        const target = animatedGeojson.features[0].geometry.coordinates[lastIndex];
        if (typeof target !== 'undefined') {
            window.map.panTo(target);
        }
    });
});




/**
 * Utility functions
 */

 function getNormalizedScrollPosition() {
    const y = window.pageYOffset; // scroll position
    const vh = document.documentElement.clientHeight; // viewport height
    const dh = document.body.scrollHeight; // full page height
    return y / (dh - vh); // Normalized scroll position from 0 - 1
 }

function removeElevationFromCoordinates(geojson) {
    const cleanFeatureCollection = [];
    for (const feature of geojson.features) {
        cleanFeatureCollection.push({
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': feature.geometry.coordinates.map(c => [c[0], c[1]])
            }
        });
    }
    return {
        'type': 'FeatureCollection',
        'features': cleanFeatureCollection
    };
}

function geocoderResponsesToGeojson(responses, confidenceThreshold = 0) {
    const features = [].concat(...responses.map(r => r.data.features));
    const filtered = features.filter(f => f.properties.confidence >= confidenceThreshold);

    if (filtered.length < 1) {
        alert('Geocoder returned no geometry (with a confidence threshold of ' + confidenceThreshold + ')');
    }

    return {
        'type': 'FeatureCollection',
        'features': filtered
    };
}

function lineLayer(geojson, color = '#ffff00', width = 3, id = null) {
    return {
        'id': id ? id : String((new Date).getTime()),
        'type': 'line',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round',
        },
        'paint': {
            'line-color': color,
            'line-width': width,
            'line-opacity': 0.5
        },
        'source': {
            'type': 'geojson',
            'data': geojson
        }
    };
}

function setupLineAnimationLayers() {
    window.map.addLayer({
        'id': 'line-animation-bg',
        'type': 'line',
        'source': 'line-animation',
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#510bff',
            'line-width': 9,
            'line-opacity': 0.1
        }
    });
    window.map.addLayer({
        'id': 'line-animation',
        'type': 'line',
        'source': 'line-animation',
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#008eff',
            'line-width': 4,
            'line-opacity': 0.5
        }
    });
    window.map.addLayer({
        'id': 'line-animation-fg',
        'type': 'line',
        'source': 'line-animation',
        'layout': {
            'line-cap': 'round',
            'line-join': 'round'
        },
        'paint': {
            'line-color': '#aceeff',
            'line-width': 0.5,
            'line-opacity': 0.7
        }
    });
}
