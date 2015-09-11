'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:SlideCtrl
 * @description
 * # SlideCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('SlideCtrl', function ($scope, requisition, slideGenerator, $routeParams) {
    //TODO trocar o 1 pelo id da rota em $routeParam ou $stateParam

    $scope.index = 0;

    $scope.isFullscreen = false;

    $scope.toggleFullScreen = function() {
        $scope.index = 0;
        $scope.actualImage = $scope.presentation.slidesImages[$scope.index];
        $scope.isFullscreen = !$scope.isFullscreen;
    }

    $scope.next = function(){
        if($scope.index < $scope.presentation.slidesImages.length)
          ++$scope.index;
        $scope.actualImage = $scope.presentation.slidesImages[$scope.index];
    }

    $scope.previous = function(){
        if($scope.index > 0)
          --$scope.index;
        $scope.actualImage = $scope.presentation.slidesImages[$scope.index];
    }



    requisition.get({
      url:'/slide/'+$routeParams.id,
      success: function(data){
        var slides = slideGenerator.generateSlides(data);
        data.slidesImages = slides;
        $scope.presentation = data;
        $scope.actualImage = $scope.presentation.slidesImages[$scope.index];
        console.log($scope.presentation);
      },
      error: function(data){
        swal("Desculpe!", data.userMessage, "error");
      }
    });

  });
