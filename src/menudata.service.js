(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$timeout','$http']
function MenuDataService($q, $timeout,$http) {
  var service = this;

  // List of shopping items
  var items = [];

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    var deferred = $q.defer();

    var  r =   $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/categories.json")
      }).then(function (response) {
      console.log(response);
      items = response.data;
      deferred.resolve(items);
    })
    .catch(function (error) {
      console.log(error);
    })

    return deferred.promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var deferred = $q.defer();

    var  r =   $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
      }).then(function (response) {
      console.log(response);
      items = response.data.menu_items;
      deferred.resolve(items);
    })
    .catch(function (error) {
      console.log(error);
    })

    return deferred.promise;
  };
}

})();
