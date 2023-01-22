 var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('imgMap'), {
          center: {lat: 50.212, lng: 1.776}, 
          zoom:8
        });
        var marker = new google.maps.Marker({position: {lat:50.212, lng:1.776}, map: map});     
      }
      ajaxGet('http/localhost/p7/js/coordonates.json', function (response) {
        var coords = JSON.parse(response);
        for (let i = 0; i < coords.length; i++) {
            var lat= coords.coordonates[i].lat; 
            var long= coords.coordonates[i].long; 
            var latLong= new google.maps.LatLng(lat,long);
            var marker = new google.maps.Marker({position: latLong, map: map})
         }
        });
  
