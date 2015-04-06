var directives = angular.module('move.directives', []);

directives.directive("fullScreenSection", function () {
  var func = function (scope, element, attributes) {
    element[0].style.height = (screen.height - 44) + "px";
  };

  return {
    link: func,
  }

});
