var directives = angular.module('move.directives', []);

directives.directive("fullScreenSection", function () {
  var func = function (scope, element, attributes) {
    console.log("Hey", element);
    console.log(screen.height);

    element[0].style.height = screen.height + "px";
  };

  return {
    link: func,
  }

});
