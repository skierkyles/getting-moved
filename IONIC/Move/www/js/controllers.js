var controllers = angular.module('move.controllers', []);

controllers.controller('AppCtrl', function($scope) {

});

controllers.controller('ActivitiesCtrl', function($scope, resolvedTasks) {
  $scope.activities = resolvedTasks;
});

controllers.controller('ActivityCtrl', function($scope, $state, Task, resolvedTask) {
  console.log('ActivityCtrl', resolvedTask);
  $scope.activity = resolvedTask;

  $scope.logNewTask = function (data) {
    console.log("$scope.logNewTask(data)");
    console.log(data);

    Task.sendTask($scope.activity.id, data.content).then(
      function (success) {
        data.content = "";
        $state.go('app.logged_task', {taskId: success.id});
      },
      function (error) {

      }
    )
  };
});

controllers.controller('LoggedTaskCtrl', function($scope, Camera, Task, resolvedTask) {
  console.log("LoggedTaskCtrl", resolvedTask);
  $scope.task = resolvedTask;

  $scope.takePicture = function () {
    console.log("takePicture()");
    Camera.getPicture({
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
    }).then(
      function(result) {
        Task.sendImage($scope.task.id, result).then(
          function (success) {
            alert('Sent!', success);

          },
          function (error) {
            alert('Failwhale!', error);
          });
      },
      function (error) {

      }
    );
  };
});

controllers.controller('AccountCtrl', function($scope, $ionicModal, $auth, UserService, resolvedUser) {
  console.log(resolvedUser);
  $scope.data = resolvedUser;
});

controllers.controller('AccountLoginCtrl',
  function ($scope, $auth, $state, $ionicHistory, UserService) {

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    $auth.submitLogin($scope.loginData)
      .then(function (resp) {
        console.log("Successfuly Logged In");
        console.log(resp);

        $scope.form_has_errors = false;

        UserService.setUserData(resp);

        $ionicHistory.nextViewOptions({
          disableBack: true,
        })

        $state.go('app.account');
      })
      .catch(function (resp) {
        console.log("Failed Logged In");
        console.log(resp);

        $scope.form_has_errors = true;
        $scope.error_msg = resp.errors[0];
      });
  };
});
