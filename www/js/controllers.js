angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope) {})

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
  var baseUrl = "http://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&&dateRange=2005-01-01%2C2010-01-01&orderBy=title&limit=50";
  var requestUrl = baseUrl + "&ts=" + ts + "&apikey=" + apikey + "&hash=" + hash;
  $http.get(requestUrl)
  .then(function(response) {
      var comics = [];
      var comicObject = response.data;
      for (var i = 0; i < 50; i++) {
        comics.push({id: comicObject.data.results[i].id,
                     title: comicObject.data.results[i].title,
                     thumbnail: comicObject.data.results[i].thumbnail.path + "/standard_large.jpg",
                     format: comicObject.data.results[i].format,
                     url: comicObject.data.results[i].urls[0].url,
                     series: comicObject.data.results[i].series.name,
                     onsaleDate: comicObject.data.results[i].dates[0].date,
        });
      }
      console.log(comics);
      $scope.comics = comics;
  });
})

.controller('ComicDetailCtrl', function($scope, $stateParams, Comics) {
  //$scope.comic = Comics.get($stateParams.comicId);
});
