# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
`$(document).ready(function() {
  $('#fullpage').fullpage({
    menu: '#menu',
    anchors: ['loginPage', 'signUpPage'],
    sectionsColor: ['#4E98B8', '#F49627'],
    autoScrolling: false
  });
});`
