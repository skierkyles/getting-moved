// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('move', ['ionic', 'move.controllers', 'move.services',
                          'move.directives', 'ng-token-auth']);

app.run(function($ionicPlatform, $rootScope, $state, UserService) {
  console.log("app.run");

  $ionicPlatform.ready(function() {
    if (!UserService.isLoggedIn()) {
      $state.go("login");
    }

    $rootScope.$on("$stateChangeStart", function (event, next, current) {
      console.log("On Route Change");
      if (!UserService.isLoggedIn()) {
        event.preventDefault();
        if (next.name != "login") {
          $state.go("login");
        }
      }
    });
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $authProvider.configure({
    apiUrl: SERVER_ADDRESS + "/1",
    emailSignInPath: '/api_sessions',
    handleLoginResponse: function (response) {
      return response;
    },
  });

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('app.activities', {
    url: "/activities",
    views: {
      'menuContent': {
        templateUrl: "templates/activities.html",
        controller: 'ActivitiesCtrl'
      }
    },
    resolve: {
      resolvedTasks: function (Task) {
        return Task.getTasks();
      }
    }
  })

  .state('app.activity', {
    cache: false,
    url: "/activities/:activityId",
    views: {
      'menuContent': {
        templateUrl: "templates/activity.html",
        controller: 'ActivityCtrl'
      }
    },
    resolve: {
      resolvedTask: function ($stateParams, Task) {
        var taskId = $stateParams.activityId;

        return Task.getTask(taskId);
      }
    }
  })

  .state('app.logged_task', {
    cache: false,
    url: "/activities/logged_tasks/:taskId",
    views: {
      'menuContent': {
        templateUrl: "templates/logged_task_detail.html",
        controller: "LoggedTaskCtrl",
      }
    },
    resolve: {
      resolvedTask: function ($stateParams, Task) {
        var taskId = $stateParams.taskId;

        return Task.getDetailedTask(taskId);
      }
    }
  })

  .state('app.account', {
    cache: false,
    url: "/account/",
    views: {
      'menuContent': {
        templateUrl: "templates/account.html",
        controller: 'AccountCtrl',
      }
    },
    resolve: {
      resolvedUser: function (UserService) {
        return { isLoggedIn: UserService.isLoggedIn(), user: UserService.getUser(), auth: UserService.getAuthToken() };
      }
    }
  })

  .state('login', {
    cache: false,
    url: "/account/login/",
    templateUrl: "templates/account_login.html",
    controller: 'AccountLoginCtrl',
  });
  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/app/activities');

});

app.filter('date2', function($filter) {
  var suffixes = ["th", "st", "nd", "rd"];
  return function(input, format) {
    var dtfilter = $filter('date')(input, format);
    var day = parseInt($filter('date')(input, 'dd'));
    var relevantDigits = (day < 30) ? day % 20 : day % 30;
    var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
    return dtfilter.replace('oo', suffix);
    //return dtfilter+suffix;
  };
});
