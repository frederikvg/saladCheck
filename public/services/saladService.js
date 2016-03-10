'use strict'

var saladCheck = angular.module('saladCheck');

saladCheck.factory('saladService', function ($http, $q) {
    var vm = this;

    vm.getIngredients = function() {
        var deferred = $q.defer();
        $http.get('json/ingredients.json')
            .success(function(data) {
                deferred.resolve(data);
                console.log(data);
            })
            .error(function(err) {
                console.log('Gegevens konden niet worden opgehaald.');
                deferred.reject(err);
            });
        return deferred.promise;
    };

    return {
        getIngredients: vm.getIngredients
    };
});