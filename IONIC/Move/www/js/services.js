//EXAMPLE JSON DATA: {"response":[{"id":1,"title":"Skiing 2014/2015","created_at":"2015-02-01T22:46:20.721-07:00","updated_at":"2015-02-01T22:46:20.721-07:00","user_id":1},{"id":2,"title":"Climbing 2015","created_at":"2015-02-10T23:15:28.156-07:00","updated_at":"2015-02-10T23:15:28.156-07:00","user_id":1}],"count":2}

var move_services = angular.module('move.services', []);

move_services.factory('Task', function ($q, $http, UserService) {
  var service = {};

  service.getTasks = function () {
    var dfd = $q.defer();

    var id = UserService.getUser().id;

    $http.get('http://0.0.0.0:3000/1/api_tasks/' + id).then(
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
    var dfd = $q.defer();

    $http.get('http://0.0.0.0:3000/1/api_logged_tasks/' + taskId).then(
      function (success) {
        dfd.resolve(success.data.logged_task);
      },
      function (failure) {
        dfd.reject(failure);
      }
    );

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
      }
    }
});

function setObject(key, value) {
  window.localStorage[key] = JSON.stringify(value);
}
function getObject(key) {
  return JSON.parse(window.localStorage[key] || '{}');
}
