(function(module) {
  var indexController = {};
  indexController.closeBeaches = [];

  indexController.generateCloseBeaches = function() {
    indexController.closeBeaches = beachData.beachArray.filter(function(ele) {
      var parkLat = (parseFloat(ele.latitude) * 1000000000);
      var parkLng = (parseFloat(ele.longitude) * 1000000000);

      var range = parseFloat(110000000);
      var userLowerLat = mainView.userLat * 1000000000 - range;
      var userUpperLat = mainView.userLat * 1000000000 + range;
      var userLowerLng = mainView.userLng * 1000000000 - range;
      var userUpperLng = mainView.userLng * 1000000000 + range;

      return (parkLat > userLowerLat && parkLat < userUpperLat), (parkLng > userLowerLng && parkLng < userUpperLng);
    });
  };


  module.indexController = indexController;
})(window);
