var map, infoWindow, infos, marker,geocoder;
var arrayRate = [];
var rateIndex = 0;
var geoCodeAdress;

var filterBtn = document.getElementById('filterBtn');
var returnList=  $('<input type="button" value="retour à la liste">');
var addComment= $('<input type="button" value="Ajouter un avis">');



$(function(){

ajaxGet('http://localhost/p7/js/coordonates.json', function (response) {
  infos = JSON.parse(response);
  rating();
  initMap();
  insertRestoList();
});
//Map 
function initMap() {
  map = new google.maps.Map(document.getElementById('imgMap'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;
  geocoder = new google.maps.Geocoder;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      new google.maps.Marker({
        position: { lat: pos.lat, lng: pos.lng },
        map: map,
        icon: 'http://localhost/p7/geoUSer.png'
      });
      infoWindow.setPosition(pos);
      infoWindow.setContent("You're here!");
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

// add a new marker on click
  map.addListener('click', function (e) {
    placeMarkerAndPanTo(e.latLng, map);
    geocodeLatLng(geocoder, map, infoWindow); 
  });
}


// functions calculate average rating T =>exort fonction JS
function rating() {
  infos.coordonates.forEach(restoRate => {
    var starsAmount = 0;
    for (let i = 0; i < restoRate.ratings.length; i++) {
      starsAmount += restoRate.ratings[i].stars
    }
    var averageRate = starsAmount / restoRate.ratings.length;
    arrayRate.push(averageRate);
  });
}
//function restaurants filter T =>exort fonction JS
filterBtn.addEventListener('click', function () {
  $('#commentArea').css('display','none');
  $('#restoDescription').html("");
    $('#restoDescription').css('display','none');
var divRestList = document.querySelectorAll('#restList .resto');
var option = document.getElementById('option');
  console.log(divRestList.length);
  console.log(option.value);
  
  for (let i = 0; i < arrayRate.length; i++) {
   
    if (arrayRate[i] < option.value) {
      divRestList[i].style.display = "none";
    }
    else{
      divRestList[i].style.display = "block";
    }
  }
})

//function add new restaurant T =>exort fonction JS
function placeMarkerAndPanTo(latLng, map) {
   marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
}

//Reverse geocoding
function geocodeLatLng(geocoder, map, infoWindow) {
  var input = marker.position;
  geocoder.geocode({'location': input}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        infoWindow.setContent(results[0].formatted_address);
        infoWindow.open(map, marker);
        console.log(results[0].formatted_address);
        geoCodeAdress=results[0].formatted_address;
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
    var inputUrl= "https://maps.googleapis.com/maps/api/streetview?size=150x150&location="+input+"&fov=60&heading=70&pitch=0&key=AIzaSyAHjJ22F5rx_YblehAI4lt9w30Ev42vQXo"
    var newRestoUrl = inputUrl.replace(" ","").replace("(","").replace(")","");
    var nameNewResto= prompt("Entrez le nom du restaurant:");
    var rateNewResto= prompt("Entrez une note:");
    var divNewResto = $('<div></div>').addClass('resto');
    var newRestoAdress = $('<p></p>').html(results[0].formatted_address+'</br>')
    var titleNewResto = $('<h4></h4>').addClass('title');
    $('<a href="#restoDescription"></a>').text(nameNewResto).appendTo(titleNewResto)
    var divNewSecond = $('<div class="row"></div>');
    var divNewDescription = $('<div></div>').addClass('description').text("Elle a bien soixante dix ans et elle doit avoir les cheveux blancs; je n'en sais rien; personne n'en sait rien, car elle a toujours un serre-tête noir qui lui colle comme du taffetas sur le crâne;").appendTo(divNewSecond);
    var imgNewResto = $('<img/>').attr('src', newRestoUrl).css('margin-right', '5px');
    imgNewResto.appendTo(divNewDescription);
    titleNewResto.appendTo(divNewResto);
    newRestoAdress.appendTo(divNewResto);
    divNewDescription.appendTo(divNewResto);
    divNewResto.appendTo('#restList');
    for (let i = 0; i < 5; i++) {
      var inputStar = $('<i class="fas fa-star"></i>');
      inputStar.appendTo(newRestoAdress);
      if (Math.floor(parseInt(rateNewResto))> i) {
        inputStar.css('color', 'yellow');
      }
    }
  });
}

  //Adding restaurant's list into web page T =>export fonction JS
 function insertRestoList () {
   infos.coordonates.forEach(resto => {
    new google.maps.Marker({ position: { lat: resto.lat, lng: resto.long }, map: map })
    var addressResto = $('<p></p>').html(resto.address+'</br>' )
    var titleResto = $('<h4></h4>').addClass('title');
    $('<a href="#restoDescription"></a>').text(resto.restaurantName).appendTo(titleResto);
    var divResto = $('<div></div>').addClass('resto');
    var divSecond = $('<div class="row"></div>');
    var divDescription = $('<div></div>').addClass('description').text(resto.description).appendTo(divSecond);
    var imgResto = $('<img/>').attr('src', resto.url).css('margin-right', '5px');
    titleResto.appendTo(divResto);
    addressResto.appendTo(divResto);
    imgResto.appendTo(divDescription);
    divResto.appendTo('#restList');
    divDescription.appendTo(divResto);
    for (let i = 0; i < 5; i++) {
      var inputStar = $('<i class="fas fa-star"></i>');
      inputStar.appendTo(addressResto);
      if (Math.floor(arrayRate[rateIndex]) > i) {
        inputStar.css('color', 'yellow');
      }
    }
  var rateInt = arrayRate[rateIndex];
  $('<span></span>').text('note : '+ rateInt+' ('+resto.ratings.length+' avis.)').insertAfter($('i:last'));
    $('p > i:first-child').css('margin-left', '10px');
    rateIndex++;
  })

  //restaurant description card
  var divList = $('#restList a');
  divList.click(function(e){
    $('#restList div[class="resto"]').css('display','none');
    $('#restoDescription').html("");
    var clickValue = e.target.innerHTML;   
    switch (clickValue) {
      case infos.coordonates[0].restaurantName:
        rateIndex =0;
        break;
      case infos.coordonates[1].restaurantName:
          rateIndex =1;
          break;

      case infos.coordonates[2].restaurantName:
            rateIndex =2;
            break;
      case infos.coordonates[3].restaurantName:
           rateIndex =3;
           break;
      case infos.coordonates[4].restaurantName:
           rateIndex=4;
           break;    
      case infos.coordonates[5].restaurantName:
            rateIndex=5;
            break;
      case infos.coordonates[6].restaurantName:
            rateIndex=6;
            break;
    }
    var titleCard = $('<h4></h4>').text(infos.coordonates[rateIndex].restaurantName).addClass('title');
    titleCard.appendTo('#restoDescription');
    var paraCard= $('<p></p>').html(infos.coordonates[rateIndex].address +'</br>');
    paraCard.appendTo('#restoDescription');
    for (let i = 0; i < 5; i++) {
      var starCard = $('<i class="fas fa-star"></i>');
      starCard.appendTo('#restoDescription p');
      if (Math.floor(arrayRate[rateIndex])>i) {
        starCard.css('color', 'yellow');
      }
    }
    $('<span></span>').text('note : '+arrayRate[rateIndex]+' ('+ infos.coordonates[rateIndex].ratings.length+' avis.)').insertAfter($('#restoDescription i:last'));
    var imgResto = $('<img/>').attr('src', infos.coordonates[rateIndex].url).css('width', '300px').css('height','200px');
    var divSecond = $('<div class="row"></div>').css('justify-content','center');
    imgResto.appendTo(divSecond);
    divSecond.appendTo('#restoDescription');
    
    $('<h4>Avis des clients</h4>').addClass('h4Comment').appendTo('#restoDescription');
    var divComment= $('<div class="row"></div>').addClass('divComment');
    infos.coordonates[rateIndex].ratings.forEach(comText => {
      var rowName=$('<div></div>').addClass('divComment');
      var coName= $('<i class="far fa-user-circle"></i>').text(comText.name).css('text-align','left');
      var comParagraph= $('<p></p>').text(comText.comment).addClass('pComment');
      coName.appendTo(rowName);
      rowName.appendTo(divComment);
      comParagraph.appendTo(divComment);
    })
    divComment.appendTo('#restoDescription'); 
    var btnCard= $('<div></div>').addClass('btnClass');
   returnList.appendTo(btnCard);
   addComment.appendTo(btnCard);
   btnCard.appendTo('#restoDescription');
  $('#restoDescription').css('display','block');
  var btnReturn= document.querySelectorAll('#restoDescription input'); 
  console.log(btnReturn.length);
  btnReturn[0].addEventListener('click',function(){
    $('#restoDescription').css('display','none');
    $('div[class="resto"]').css('display','block');
    $('#commentArea').css('display','none')
  })
  btnReturn[1].addEventListener('click',function(){
  $('#commentArea').css('display','flex').addClass('commentArea');
  $('#textarea').val('');
  $('#pseud').val('');
  })
  })
}
 $('#postCom').click(function(){
  var divComment= $('#restoDescription div[class="row divComment"]');
  var rowComment=$('<div></div>').addClass('divComment');
  var coComment= $('<i class="far fa-user-circle"></i>').text($('#pseud').val()).css('text-align','left');
  var paraComment= $('<p></p>').text($('#textarea').val()).addClass('pComment');
coComment.appendTo(rowComment);
paraComment.appendTo(rowComment);
rowComment.appendTo(divComment);
$('#commentArea').css('display','none');
})

// user's function for adding a new restaurant 

})
