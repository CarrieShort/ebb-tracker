(function(module) {
  var beachData = {};
  beachData.beachArray = [];
  var keys = [];

  var ref = new Firebase('https://ebb-tracker.firebaseio.com/beaches');

  beachData.retrieveData = function(ctx, next) {
    ref.once("value", function(snapshot) {
      // The callback function will get called twice, once for "fred" and once for "barney"
      if (beachData.beachArray.length > 0){
        beachData.beachArray = [];
      }
      snapshot.forEach(function(childSnapshot) {
        // key will be "fred" the first time and "barney" the second time
        var key = childSnapshot.key();
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        beachData.beachArray.push(childData.exampleUpdate);
      });
      next();
    });
  };

  module.beachData = beachData;
})(window);
