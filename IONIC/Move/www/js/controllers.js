var controllers = angular.module('move.controllers', []);

controllers.controller('AppCtrl', function($scope, $ionicModal, $auth, UserService) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $auth.submitLogin($scope.loginData)
      .then(function (resp) {
        console.log("Successfuly Logged In");
        console.log(resp);

        $scope.form_has_errors = false;

        UserService.setUserData(resp);
        $scope.modal.hide();
      })
      .catch(function (resp) {
        console.log("Failed Logged In");
        console.log(resp);

        $scope.form_has_errors = true;
        $scope.error_msg = resp.errors[0];
      });
  };
});

controllers.controller('ActivitiesCtrl', function($scope, resolvedTasks) {
  $scope.activities = resolvedTasks;
});

controllers.controller('ActivityCtrl', function($scope, $ionicModal, resolvedTask) {
  console.log(resolvedTask);
  $scope.activity = resolvedTask;
});

controllers.controller('LoggedTaskCtrl', function($scope, resolvedTask) {
  $scope.task = resolvedTask;
});

controllers.controller('AccountCtrl', function($scope, resolvedUser) {
  console.log(resolvedUser);
  $scope.data = resolvedUser;
});
