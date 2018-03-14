mapboxgl.accessToken = 'pk.eyJ1IjoiZW5kcmVocCIsImEiOiJjamRsNmlvZjYwM3RqMnhwOGRneDhhc2ZkIn0.wVZHznNCtC5_gJAnLC2EJQ';

var pause = false;
var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-98.2022, 16.6855], // initial map center in [lon, lat]
  zoom: 5.5
});

map.on('load', function() {
    map.addLayer({
      id: 'collisions',
      type: 'circle',
      source: {
        type: 'geojson',
        data: './map_all.geojson' // replace this with the url of your own geojson
      },
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['number', ['get', 'S_Gal']],
        0, 4,
        5, 24
        ],
        'circle-color': [
          'interpolate',
          ['linear'],
          ['number', ['get', 'S_Gal']],
          0, '#000000',
          5, '#b8ecff',
          10,'#05bcff',
          15,'#2fff05',
          25,'#ffd505',
          50,'#ff9f05',
          75,'#ff6d05',
          100,'#ff0505',
          150,'#C70000'
            
          
        ],
        'circle-opacity': 0.8
      }
    }, 'admin-2-boundaries-dispute');
    
document.getElementById('slider').addEventListener('input', function(e) {
  var Time = parseInt(e.target.value);
  // update the map
  updateLayer(Time)  
});


document.querySelector('.btn-pause').addEventListener('click', function() {pause=true});

document.querySelector('.btn-new').addEventListener('click',function() {
var i=0;
pause=false;
for (var j=0; j < 100; j++) {
    if (pause==false) {
    setTimeout( function () {
        
        document.getElementById('slider').value=i;
        var Time = i;
        console.log(i);
        i++;
        updateLayer(Time) }, j*100);
    }
}
});
    
  
});

function updateLayer(Time) {
    map.setFilter('collisions', ['==', ['number', ['get', 'Time']], Time]);

    document.getElementById('active-hour').innerText = Time;
                            
}



