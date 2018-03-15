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
        data: './map_all4.geojson' // replace this with the url of your own geojson
      },
      paint: {
        'circle-radius':
          
          
          [
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
    
map.addLayer({
      id: 'act',
      type: 'circle',
      source: {
        type: 'geojson',
        data: './map_all4.geojson' // replace this with the url of your own geojson
      },
      paint: {
        'circle-radius': 6,
          
        'circle-color': ["step",
            ['number', ['get', 'MdAct']] ,
            '#000000',
            0,'#000000',
            1, '#2fff05'
            
        ]
            
          
        ,
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
        
        i++;
        updateLayer(Time) }, j*100);
    }
}
});
    
map.on('click', 'collisions', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.Description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
    });
    
  
});

function updateLayer(Time) {
    map.setFilter('collisions', ['==', ['number', ['get', 'Time']], Time]);
    map.setFilter('act', ['==', ['number', ['get', 'Time']], Time]);
    
    document.getElementById('active-hour').innerText = Time;
    
}

