//EXAMPLE JSON DATA: {"response":[{"id":1,"title":"Skiing 2014/2015","created_at":"2015-02-01T22:46:20.721-07:00","updated_at":"2015-02-01T22:46:20.721-07:00","user_id":1},{"id":2,"title":"Climbing 2015","created_at":"2015-02-10T23:15:28.156-07:00","updated_at":"2015-02-10T23:15:28.156-07:00","user_id":1}],"count":2}

var move_services = angular.module('move.services', []);

move_services.factory('Task', function () {
  var service = {};

  service.getTasks = function () {
    var tasks = '{"response":[{"id":1,"title":"Skiing And Such 2015","created_at":"2015-02-15T20:49:04.480-07:00","updated_at":"2015-02-15T20:49:04.480-07:00","user_id":1},{"id":2,"title":"Climbing Things 2015","created_at":"2015-02-15T20:54:57.459-07:00","updated_at":"2015-02-15T20:54:57.459-07:00","user_id":1}],"count":2}'
    var json = angular.fromJson(tasks);

    return json.response;
  }

  service.getTask = function (taskId) {
    var tasks = service.getTasks();
    // var tasks = [];

    for (var x = 0; x < tasks.length; x++) {
      var task = tasks[x];
      if (task.id == taskId) {
        return task;
      }
    }

    return null;
  }

  service.getLoggedTasks = function (taskId) {
    var logged_task = '{"response":[{"id":2,"notes":"Skiing Box elder","created_at":"2015-02-15T20:49:32.831-07:00","updated_at":"2015-02-15T20:49:32.831-07:00","task_id":1,"task_date":"2015-02-14"},{"id":1,"notes":"Skiing Red Baldy","created_at":"2015-02-15T20:49:18.974-07:00","updated_at":"2015-02-15T20:49:18.974-07:00","task_id":1,"task_date":"2015-02-13"}],"count":2}'

    var json = angular.fromJson(logged_task);

    return json.response;
  }

  return service;
});

move_services.service('UserService', function () {
    var auth_token = null;

    var user = {
      id: null,
      name: null,
      email: null,
    }

    return {
      loadUser: function (data) {
        auth_token = data.token;


        console.log(data);
      }
    }
});
