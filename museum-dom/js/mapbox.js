//token pk.eyJ1IjoiYWxlbmFhc3RyYXZ1a2giLCJhIjoiY2t1Y2dlb3ozMGpzZTJ4bXRoamxlMmFndiJ9.Kmn3GKjeiCDPgsro622Sxw
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlbmFhc3RyYXZ1a2giLCJhIjoiY2t1Y2dlb3ozMGpzZTJ4bXRoamxlMmFndiJ9.Kmn3GKjeiCDPgsro622Sxw';

let map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/alenaastravukh/ckuch9a0e20a518qjrtung1o4',
center: [2.3364, 48.86091],
zoom: 15.5
});

let marker1 = new mapboxgl.Marker({
  color: 'black',
})
.setLngLat([2.3364, 48.86091])
.addTo(map);

let marker2 = new mapboxgl.Marker({
  color: 'grey',
})
.setLngLat([2.3333, 48.8602])
.addTo(map);

let marker3 = new mapboxgl.Marker({
  color: 'grey',
})
.setLngLat( [2.3397, 48.8607])
.addTo(map);

let marker4 = new mapboxgl.Marker({
  color: 'grey',
})
.setLngLat([2.3330, 48.8619])
.addTo(map);

let marker5 = new mapboxgl.Marker({
  color: 'grey',
})
.setLngLat([2.3365, 48.8625])
.addTo(map);

map.addControl(new mapboxgl.NavigationControl());
// map.addControl(new mapboxgl.FullscreenControl());
