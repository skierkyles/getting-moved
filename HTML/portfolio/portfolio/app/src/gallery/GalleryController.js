(function(){

  angular
       .module('gallery')
       .controller('GalleryController', [
          '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          GalleryController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function GalleryController( $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;
  }

})();
