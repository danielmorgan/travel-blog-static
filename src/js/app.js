const mapboxgl = window.mapboxgl;
mapboxgl.accessToken = window.mapbox.key;

window.map = new mapboxgl.Map({
    container: 'map',
    center: [-2.222678, 53.42683],
    zoom: 15,
    style: 'mapbox://styles/morgan345/cj0a1fues00b92rny9c27800q'
});

window.map.on('load', () => {
    require('./geocoder-test');
});
