const mapboxgl = window.mapboxgl;
mapboxgl.accessToken = window.mapbox.key;

window.map = new mapboxgl.Map({
    container: 'map',
    center: [0, 0],
    zoom: 14,
    style: 'mapbox://styles/mapbox/streets-v9'
});

window.map.on('load', () => {
    require('./geocoder-test');
});
