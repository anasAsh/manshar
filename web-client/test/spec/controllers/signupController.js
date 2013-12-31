'use strict';

describe('Controller: SignupCtrl', function () {

  beforeEach(module('webClientApp'));

  var createController, scope, location, routeParams, SignupSrv;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $location, $rootScope, $routeParams, SignupService) {
    routeParams = $routeParams;
    location = $location;
    SignupSrv = SignupService;

    scope = $rootScope.$new();
    createController = function () {
      return $controller('SignupCtrl', {
        $scope: scope,
        $routeParams: routeParams,
        $location: location
      });
    };
  }));

  describe('LoginCtrl.signup', function () {
    it('should signup user and redirect', function () {
      spyOn(SignupSrv, 'signup').andCallFake(function(user, success) {
        success();
      });

      routeParams.prev = '/articles/1';
      createController();
      scope.signup({});

      expect(location.path()).toBe('/articles/1');

      // Should redirect to / if prev parameter didn't exist.
      delete routeParams.prev;
      createController();
      scope.signup({});

      expect(location.path()).toBe('/');

    });

    it('should set error message when login fails', function () {
      spyOn(SignupSrv, 'signup').andCallFake(function(user, success, error) {
        error();
      });

      routeParams.prev = '/articles/1';
      createController();
      scope.signup({});

      expect(scope.error).toBe('An error occurs.');
    });

  });
});