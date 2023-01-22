//Code JQuery : Démarrage d'une partie 
$(function () {
    $('#newResto').on('click',function(){
        var restoCard= 
            {
              "restaurantName": $('#Nom').val(),
              "adress":$('#place').val()+$('#city').val()+$('#postalCode').val() ,
              "description": $('#description').val(),
              "stars": $('select').val()
            }
          var addressResto= $('<p></p>').text(restoCard.adress);
          var titleResto=$('<h4></h4>').text(restoCard.restaurantName);
          var divResto= $('<div></div>').addClass('resto');
          var divSecond= $('<div class="row"></div>');
          var divDescription =$('<div></div>').addClass('description').text(restoCard.description).appendTo(divSecond);
          titleResto.appendTo(divResto);
          addressResto.appendTo(divResto);      
          divResto.appendTo('#restList');
          divDescription.appendTo(divResto);
          for (let i = 0; i <restoCard.stars; i++) {
            $('<i class="fas fa-star"></i>').appendTo(addressResto); 
           }
          $('p > i:first-child').css('margin-left', '10px');   
      });
  });
 
  map.addListener('click', function (e) {
    placeMarkerAndPanTo(e.latLng, map);
    var nameNewResto= prompt("Entrez le nom du restaurant:");
    var rateNewResto= prompt("Entrez une note:");
    var newRestoAdress = $('<p></p>').text();
    var titleNewResto = $('<h4></h4>');
    ('<a></a').text(nameNewResto).appendTo(titleNewResto);
    var divNewResto = $('<div></div>').addClass('resto');
    var divNewSecond = $('<div class="row"></div>');
    var divNewDescription = $('<div></div>').addClass('description').text("BlablablablablablablablablablaBlablablaBlablablaBlablablaBlablablaBlablabla").appendTo(divNewSecond);
    var imgNewResto = $('<img/>').attr('src', resto.url).css('margin-right', '5px');
    titleNewResto.appendTo(divNewResto);
    newRestoAdress.appendTo(divNewResto);
    imgNewResto.appendTo(divNewDescription);
    divNewResto.appendTo('#restList');
    divNewDescription.appendTo(divNewResto);
    for (let i = 0; i < 5; i++) {
      var inputStar = $('<i class="fas fa-star"></i>');
      inputStar.appendTo(newRestoAdress);
      if (Math.floor(parseInt(rateNewResto))> i) {
        inputStar.css('color', 'yellow');
      }
    }
  });


  var nameNewResto= prompt("Entrez le nom du restaurant:");
  var rateNewResto= prompt("Entrez une note:");
var newRestoAdress = $('<p></p>').text()
  var titleNewResto = $('<h4></h4>').text(nameNewResto);
  var divNewResto = $('<div></div>').addClass('resto');
  var divNewSecond = $('<div class="row"></div>');
  var divNewDescription = $('<div></div>').addClass('description').text("").appendTo(divNewSecond);
  var imgNewResto = $('<img/>').attr('src', resto.url).css('margin-right', '5px');
  titleNewResto.appendTo(divNewResto);
  newRestoAdress.appendTo(divNewResto);
  imgNewResto.appendTo(divNewDescription);
  divNewResto.appendTo('#restList');
  divNewDescription.appendTo(divNewResto);
  for (let i = 0; i < 5; i++) {
    var inputStar = $('<i class="fas fa-star"></i>');
    inputStar.appendTo(newRestoAdress);
    if (Math.floor(parseInt(rateNewResto))> i) {
      inputStar.css('color', 'yellow');
    }
  }