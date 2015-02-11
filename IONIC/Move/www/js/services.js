//EXAMPLE JSON DATA: {"response":[{"id":1,"title":"Skiing 2014/2015","created_at":"2015-02-01T22:46:20.721-07:00","updated_at":"2015-02-01T22:46:20.721-07:00","user_id":1},{"id":2,"title":"Climbing 2015","created_at":"2015-02-10T23:15:28.156-07:00","updated_at":"2015-02-10T23:15:28.156-07:00","user_id":1}],"count":2}

var move_services = angular.module('move.services', []);

move_services.factory('Task', function () {
  return {
    getTasks: function () {
      var tasks = '{"response":[{"id":1,"title":"Skiing 2014/2015","created_at":"2015-02-01T22:46:20.721-07:00","updated_at":"2015-02-01T22:46:20.721-07:00","user_id":1},{"id":2,"title":"Climbing 2015","created_at":"2015-02-10T23:15:28.156-07:00","updated_at":"2015-02-10T23:15:28.156-07:00","user_id":1}],"count":2}';
      var json = angular.fromJson(tasks);

      return json.response;
    },
    getLoggedTasks: function (taskId) {

    }
  }
});
