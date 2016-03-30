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
  beachData.beachMarker = beachData.beachArray.map(function() {
      ref.on('child_added', function(snapshot, childSnapshot) {
        // for (var i = 0; i < beachData.beachMarker.length; i++) {
        console.log('retrieve');
        var newBeach = snapshot.val();
        beachData.beachMarker.push(snapshot.val());
        return this.name;
        // };
      });
    });
  };


//   module.beachFinder = beachFinder;
// })(window);
