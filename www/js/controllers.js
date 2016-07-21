angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, $http) {

})

.controller('ComicsCtrl', function($scope, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Variables for api request
  var apikey = "f528484f82831a33b68df91a847bd45a";
  var hash = "780f995c4717391fae2df679e3abaccd";
  var ts = "1469041077";
  var baseUrl = "https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&&dateRange=2005-01-01%2C2010-01-01&orderBy=title&limit=30";
  var requestUrl = baseUrl + "&ts=" + ts + "&apikey=" + apikey + "&hash=" + hash;
  $http.get(requestUrl).then(function(response) {
      var comicObject = response.data;
      var comics = [];
      for (var i = 0; i < 30; i++) {
        comics.push({id: comicObject.data.results[i].id,
                     title: comicObject.data.results[i].title,
                     thumbnailSquare: comicObject.data.results[i].thumbnail.path + "/standard_large.jpg",
                     format: comicObject.data.results[i].format,
                     url: comicObject.data.results[i].urls[0].url,
                     series: comicObject.data.results[i].series.name,
                     onsaleDate: comicObject.data.results[i].dates[0].date,
        });
      }
      $scope.comics = comics;
  });
  $scope.submit = function() {
      var year = this.text;
      var apikey = "f528484f82831a33b68df91a847bd45a";
      var hash = "780f995c4717391fae2df679e3abaccd";
      var ts = "1469041077";
      var baseUrl = "http://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=30";
      var requestUrl = baseUrl + "&startYear=" + year + "&ts=" + ts + "&apikey=" + apikey + "&hash=" + hash;
      $http.get(requestUrl).then(function(response) {
          var comicObject = response.data;
          var comics = [];
          for (var i = 0; i < 30; i++) {
            comics.push({id: comicObject.data.results[i].id,
                         title: comicObject.data.results[i].title,
                         thumbnailSquare: comicObject.data.results[i].thumbnail.path + "/standard_large.jpg",
                         format: comicObject.data.results[i].format,
                         url: comicObject.data.results[i].urls[0].url,
                         series: comicObject.data.results[i].series.name,
                         onsaleDate: comicObject.data.results[i].dates[0].date,
            });
          }
          $scope.comics = comics;
      });
  };
})

.controller('ComicDetailCtrl', function($scope, $http, $stateParams) {
  var apikey = "f528484f82831a33b68df91a847bd45a";
  var hash = "780f995c4717391fae2df679e3abaccd";
  var ts = "1469041077";
  var id = $stateParams.comicId;
  var baseUrl = "https://gateway.marvel.com/v1/public/comics/";
  var requestUrl = baseUrl + id + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash;
  $http.get(requestUrl).then(function(response) {
      var comicObject = response.data;
      var comic = {};
      comic.id = comicObject.data.results[0].id;
      comic.title = comicObject.data.results[0].title;
      comic.thumbnailPortrait = comicObject.data.results[0].thumbnail.path + "/portrait_xlarge.jpg";
      comic.format = comicObject.data.results[0].format;
      comic.url = comicObject.data.results[0].urls[0].url;
      comic.series = comicObject.data.results[0].series.name;
      comic.onsaleDate = comicObject.data.results[0].dates[0].date;

      $scope.comic = comic;
  });
});
