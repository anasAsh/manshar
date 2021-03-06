'use strict';

angular.module('webClientApp')
  .controller('LoginCtrl', ['$scope', '$http', '$location', '$routeParams', '$analytics', 'LoginService',
      function ($scope, $http, $location, $routeParams, $analytics, LoginService) {

    $scope.user = {};
    $scope.error = null;

    $scope.login = function(user) {
      LoginService.login(user, success, error);
    };

    var success = function() {
      $analytics.eventTrack('Logged In', {});
      $location.path($routeParams.prev || '/')
        // Remove the prev param when redirecting.
        .search('prev', null);
    };

    var error = function() {
      $analytics.eventTrack('Login Error', { category: 'errors' });
      $scope.error = 'خطأ في البريد الالكتروني أو كلمة المرور';
    };

  }]);
