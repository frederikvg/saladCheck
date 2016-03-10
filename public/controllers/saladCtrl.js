(function(angular) {
    'use strict';
    
    angular.module('saladCheck')
        .controller('mainCtrl', mainCtrl);
        
    function mainCtrl($scope, saladService) {

        var vm = this;

        $scope.product = false;
        $scope.outSeason = true;
        $scope.menuCompleet = true;
        
        $scope.productName = [];
        $scope.productBans = [];
        $scope.inSeason = [];

        Array.prototype.contains = function(obj) {
            var i = this.length;
            while (i--) {
                if (this[i] == obj) {
                    return true;
                }
            }
            return false;
        };

        $scope.addProduct = function(item) {
            if (!$scope.productName.contains(item.name)) {
                $scope.productName.push(item.name);
                vm.loadBans();
            } else {
                $scope.deleteProduct(item.name);
            }
        };
        
        $scope.deleteProduct = function(item) {
            for (var i = 0; i < $scope.productName.length; i++) {
                if ($scope.productName[i] == item) {
                    $scope.productName.splice([i], 1);
                    vm.loadBans();
                }
            }
        };

        $scope.searchProduct = function() {
            if ($scope.searchItem == '') {
                $scope.menuCompleet = false;
            } else {
                $scope.menuCompleet = true;
            }
        }

        vm.loadBans = function() {
            $scope.productBans = [];
            for (var i = 0; i < $scope.productName.length; i++) {
                for (var j = 0; j < $scope.ingredients.category.length; j++) {
                    var products = $scope.ingredients.category[j].product;
                    for (var k = 0; k < products.length; k++) {
                        if (products[k].name == $scope.productName[i]) {
                            for (var m = 0; m < products[k].excluded.length; m++) {
                                if (!$scope.productBans.contains(products[k].excluded[m])) {
                                    $scope.productBans.push(products[k].excluded[m]);
            }}}}}}

        };

        vm.init = function() {
            saladService.getIngredients().then(function(data) {
                $scope.ingredients = data;
                for (var i = 0; i < $scope.ingredients.category.length; i++) {
                    var products = $scope.ingredients.category[i].product;
                    for (var j = 0; j < products.length; j++) {
                        var now = moment().dayOfYear();
                        if (parseInt(products[j].startseason) > now || now > parseInt(products[j].endseason)) {
                            $scope.inSeason.push(products[j].name);
                        }
                    }
                }
            });
            moment.locale('nl-nl');
        };
        vm.init();

    }

}(window.angular));