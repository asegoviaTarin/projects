'use strict';

/**
 * @ngdoc function
 * @name favoritosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the favoritosApp
 */
angular.module('favoritosApp')
  .controller('MainCtrl', function($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log('dentro del controller!!!!')
    var vm = this;
    vm.favoritos = [];

    vm.nuevoFavorito = {
      title : '',
      description : '',
      url : '',
    }

    function getFavs() {
      $http.get('http://localhost:3678/getFavoritos').
      then(function(data, status, headers, config) {

        vm.favoritos = data.data.favoritos
        console.log(JSON.stringify(vm.favoritos));
      }).
      catch(function(data, status, headers, config) {
        alert('error')
      });
    }

    vm.borrarFav = function(id) {
      $http.delete('http://localhost:3678/update/' + id).
      then(function(data, status, headers, config) {


        getFavs();
      }).
      catch(function(data, status, headers, config) {
        alert('error')
      });

    }

    vm.newFav = function() {
      $http.put('http://localhost:3678/update',vm.nuevoFavorito).
      then(function(data, status, headers, config) {

        getFavs();
      }).
      catch(function(data, status, headers, config) {
        alert('error')
      });

    }

    getFavs();
  });
