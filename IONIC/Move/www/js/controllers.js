var controllers = angular.module('move.controllers', []);

controllers.controller('AppCtrl', function($scope) {

});

controllers.controller('ActivitiesCtrl', function($scope, Task, resolvedTasks) {
  $scope.activities = resolvedTasks;

  $scope.doRefresh = function () {
    Task.getTasks({cache: false}).then(
      function (tasks) {
        $scope.activities = tasks;
      },
      function (failure) {}
    ).finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
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

controllers.controller('LoggedTaskCtrl', function($scope, $ionicPopup, $ionicLoading, Camera, Task, resolvedTask) {
  console.log("LoggedTaskCtrl", resolvedTask);
  $scope.task = resolvedTask;
  var task_img_id = $scope.task.id;

  $scope.takePicture = function () {
    console.log("takePicture()");
    Camera.getPicture({
      quality : 75,
      destinationType : 0,
      sourceType : 1,
      encodingType: 0,
    }).then(
      function(result) {
        $ionicLoading.show({
          template: 'Uploading...'
        });

        Task.sendImage(task_img_id, result).then(
          function (success) {
            Task.getDetailedTask(task_img_id).then(
              function (success) {
                $scope.task = success;
              },
              function (error) {}
            ).finally(function () {
              $ionicLoading.hide();
            });
          },
          function (error) {
            $ionicLoading.hide();
            $ionicPopup.alert({ title:'Error', template: "Tried to send to '" + task_img_id + "' -> " + JSON.stringify(error)});
          });
      },
      function (error) {}
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
