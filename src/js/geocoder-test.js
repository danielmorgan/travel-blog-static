import geojsonTidy from '@mapbox/geojson-tidy';
import axios from 'axios';
const geocoderUrl = `https://api.mapbox.com/matching/v4/mapbox.driving.json?access_token=${window.mapbox.key}`;


// Get route data
const fixture = require('./fixtures/walk-around-the-block');


// Remove elevation data, the geocoder API doesn't like it
const fixtureWithoutElevation = removeElevationFromCoordinates(fixture);
const start = fixtureWithoutElevation.features[0].geometry.coordinates[0];
window.map.panTo(start);
// window.map.addLayer(lineLayer(fixtureWithoutElevation, '#ffff00', 6));
const emptyGeojson = require('./fixtures/empty')(start);


// Pre-process
const fixtureTidied = geojsonTidy.tidy(fixtureWithoutElevation, {
    minimumDistance: 10, // Minimum distance between points in metres
    minimumTime: 5,      // Minimum time interval between points in seconds
    maximumPoints: 100   // Maximum points in a feature (100 point limit on Map Matching geocoder step)
});


// Send requests to geocoder
const geocoderRequests = fixtureTidied.features.map(f => axios.post(geocoderUrl, f));


console.log('fixture                ', fixture);
console.log('fixtureWithoutElevation', fixtureWithoutElevation);
console.log('geocoderInput          ', fixtureTidied);


// Get all geocoder responses and draw them on the map
axios.all(geocoderRequests).then(responses => {
    const geojson = geocoderResponsesToGeojson(responses);
    console.log('geocoderOutput         ', geojson);

    let animatedGeojson = emptyGeojson;
    window.map.addSource('line-animation', { type: 'geojson', data: animatedGeojson });
    setupLineAnimationLayers();

    document.addEventListener('scroll', scroll);
    function scroll() {
        const y = window.pageYOffset;
        const vh = document.documentElement.clientHeight;
        const dh = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const n = y / (dh - vh); // Normalized scroll position from 0 - 1

        const maxIndex = Math.floor(geojson.features[0].geometry.coordinates.length * n);
        animatedGeojson.features[0].geometry.coordinates = geojson.features[0].geometry.coordinates.slice(0, maxIndex);
        window.map.getSource('line-animation').setData(animatedGeojson);
        window.map.panTo(animatedGeojson.features[0].geometry.coordinates[animatedGeojson.features[0].geometry.coordinates.length - 1]);
    }
});









/**
 * Utility functions
 */

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
