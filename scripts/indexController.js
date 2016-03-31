(function(module) {
var indexController = {};
indexController.beachMarker = [];

indexController.arrayMarker = function() {
  indexController.beachMarker = beachData.beachArray.filter(function(ele) {
    var parkLat = parseFloat(ele.latitude);
    var parkLng = parseFloat(ele.longitude);
    console.log('parkLat', parkLat);

    var range = parseFloat(0);
    console.log(ele.latitude, ele.longitude, ele.name);
    console.log('ddfdf', userLat, userLng);

    var userLowerLat = userLat - 1;
    console.log(userLowerLat);

    var userUpperLat = userLat + 1;
    console.log(userUpperLat);

    var userLowerLng = userLng - 1;
    console.log(userLowerLng);

    var userUpperLng = userLng + 1;
    console.log(userUpperLng);


    console.log(parkLat > userLowerLat && parkLat < userUpperLat);
    return parkLat > userLowerLat && parkLat < userUpperLat;



      // ref.on('child_added', function(snapshot, childSnapshot) {
      //   console.log('retrieve');
        // var newBeach = snapshot.val();
        // beachData.beachArray.push(snapshot.val());

      // });
    });
  };


  module.indexController = indexController;
})(window);
