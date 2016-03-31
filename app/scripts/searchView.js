// (function(module) {
var beachFinder = [];
beachData.beachMarker = [];

var ref = new Firebase('https://ebb-tracker.firebaseio.com/beaches');

beachData.retrieveData = function() {
  ref.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key();
      console.log('key', key);
      var childData = childSnapshot.val();
      console.log('childData', childData);
      beachData.beachArray.push(childData.exampleUpdate);
    });
  });
}

beachData.arrayMarker = function() {
  beachData.beachMarker = beachData.beachArray.filter(function(ele) {
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


//   module.beachFinder = beachFinder;
// })(window);
