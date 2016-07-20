angular.module('starter.services', [])

.factory('Comics', function() {
  // Variables for api request
  var apikey = "f528484f82831a33b68df91a847bd45a";
  var hash = "780f995c4717391fae2df679e3abaccd";
  var ts = "1469041077";
  var baseUrl = "http://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=30";
  var requestUrl = baseUrl + "&ts=" + ts + "&apikey=" + apikey + "&hash=" + hash
  var xmlhttp = new XMLHttpRequest();
  var comics = null;
  //console.log();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var comicObject = JSON.parse(xmlhttp.responseText);
        console.log(typeof comicObject);
        extractValues(comicObject);
    }
  };
  xmlhttp.open("GET", requestUrl, true);
  xmlhttp.send();

  //Function to extract the most significant values from comicObject
  function extractValues(obj) {

  }

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  /* var comics = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
 */
  return {
    all: function() {
      return comics;
    },
    get: function(comicId) {
      for (var i = 0; i < comics.length; i++) {
        if (comics[i].id === parseInt(comicId)) {
          return comics[i];
        }
      }
      return null;
    }
  };
});
