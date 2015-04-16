var directives = angular.module('move.directives', []);

directives.directive("fullScreenSection", function () {
  var func = function (scope, element, attributes) {
    element[0].style.height = (screen.height - 44) + "px";
  };

  return {
    link: func,
  }

});

directives.directive("setRandomBackgroundImage", function () {
  var func = function (scope, element, attrs) {
    var images = [];

    for (var x = 0; x < scope.activity.logged_tasks.length; x++) {
      var lt = scope.activity.logged_tasks[x];

      for (var i of lt.images) {
        images.push(i.image);
      }
    }

    if (images.length > 0) {
      var random_image = images[Math.floor(Math.random() * images.length)];
      element[0].style.background = "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(" + random_image + ")"
      element[0].style.backgroundSize = "cover";
      element[0].style.backgroundPosition = "center";
    }
  };

  return {
    link: func,
    scope: {
      activity: '='
    }
  }
});
