(function(module) {
  var indexController = {};
  indexController.closeBeaches = [];

  indexController.generateCloseBeaches = function() {
    indexController.closeBeaches = beachData.beachArray.filter(function(ele) {
      var parkLat = (parseFloat(ele.latitude) * 1000000000);
      console.log(parseFloat(ele.latitude));
      var parkLng = (parseFloat(ele.longitude) * 1000000000);
      console.log('parkLat', parkLat);

      var range = parseFloat(110000000);
      console.log(ele.latitude, ele.longitude, ele.name);
      console.log('ddfdf', mainView.userLat, mainView.userLng);

      var userLowerLat = mainView.userLat * 1000000000 - range;
      console.log(userLowerLat);

      var userUpperLat = mainView.userLat * 1000000000 + range;
      console.log(userUpperLat);

      var userLowerLng = mainView.userLng * 1000000000 - range;
      console.log(userLowerLng);

      var userUpperLng = mainView.userLng * 1000000000 + range;
      console.log(userUpperLng);


      console.log(parkLat > userLowerLat && parkLat < userUpperLat);
      return parkLat > userLowerLat && parkLat < userUpperLat;
    });
  };


  module.indexController = indexController;
})(window);
