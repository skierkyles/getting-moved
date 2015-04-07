var move_services = angular.module('move.services', []);

move_services.factory('Task', function ($q, $http, $ionicPopup, UserService) {
  var service = {};

  service.getTasks = function (options) {
    console.log("service.getTasks(options)", options);
    options = (typeof options !== "object") ? {} : options;
    if (options.cache === undefined || options.cache === null) {
      options.cache = true;
    }

    var dfd = $q.defer();

    var id = UserService.getUser().id;

    if (id === undefined) {
      console.log("Undefined User");
      id = "";
    }

    $http.get(SERVER_ADDRESS + '/1/api_tasks/' + id, {cache: options.cache}).then(
      function (success) {
        dfd.resolve(success.data.tasks);
      },
      function (failure) {
        dfd.reject(failure);
      }
    );

    return dfd.promise;
  }

  service.getTask = function (taskId) {
    console.log("service.getTask(taskId)");
    var dfd = $q.defer();
    service.getTasks().then(
      function (tasks) {
        for (var x = 0; x < tasks.length; x++) {
          var task = tasks[x];
          if (task.id == taskId) {
            dfd.resolve(task);
          }
        }
      },
      function (failure) {
        dfd.reject(failure);
      }
    );

    return dfd.promise;
  }

  service.getDetailedTask = function (taskId) {
    console.log("service.getDetailedTask(taskId)");
    var dfd = $q.defer();

    $http.get(SERVER_ADDRESS + '/1/api_logged_tasks/' + taskId).then(
      function (success) {
        dfd.resolve(success.data.logged_task);
      },
      function (failure) {
        dfd.reject(failure);
      }
    );

    return dfd.promise;
  }

  service.sendTask = function (taskId, notes) {
    console.log("service.sendTask(taskId)");
    var dfd = $q.defer();

    var data = {
      task_id: taskId,
      notes: notes,
    }

    $http.post(SERVER_ADDRESS + '/1/api_logged_tasks/', data).then(
      function (success) {
        dfd.resolve(success.data.logged_task);
      },
      function (failure) {
        console.error(failure);
        dfd.reject(failure);
      }
    )

    return dfd.promise;
  };

  service.sendImage = function (taskId, image) {
    console.log("service.sendImage(taskId, image)");
    var dfd = $q.defer();

    var data = {
      logged_task_id: taskId,
      image_data: image,
    }

    $http.post(SERVER_ADDRESS + '/1/api_logged_tasks_images/', data).then(
      function (success) {
        if (success.data.success == false) {
          dfd.reject(success);
        } else {
          dfd.resolve(success);
        }
      },
      function (failure) {
        dfd.reject(failure);
      }
    )

    return dfd.promise;
  }

  return service;
});

var USER_DATA = "USER_DATA_343";
var AUTH_TOKEN = "AUTH_DATA_2041";

move_services.service('UserService', function () {
    var auth_token = null;

    var user = {
      id: null,
      name: null,
      email: null,
      created_at: null,
    }

    return {
      setUserData: function (data) {
        auth_token = data.token;
        user.id = data.user.id;
        user.name = data.user.name;
        user.email = data.user.email;
        user.created_at = data.user.created_at;

        this.saveUser();
      },
      saveUser: function () {
        setObject(AUTH_TOKEN, auth_token);
        setObject(USER_DATA, user);
      },
      getAuthToken: function () {
        if (auth_token === null) {
          auth_token = getObject(AUTH_TOKEN);
        }
        return auth_token;
      },
      getUser: function () {
        if (user.id === null) {
          user = getObject(USER_DATA);
        }
        return user;
      },
      isLoggedIn: function () {
        return this.getUser().id !== undefined && this.getUser().id !== null;
      }
    }
});

move_services.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
