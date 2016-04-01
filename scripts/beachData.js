(function(module) {
  var beachData = {};
  beachData.beachArray = [];
  var keys = [];

  var ref = new Firebase('https://ebb-tracker.firebaseio.com/beaches');

  beachData.retrieveData = function(ctx, next) {
    ref.once("value", function(snapshot) {
      if (beachData.beachArray.length > 0){
        beachData.beachArray = [];
      }
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        beachData.beachArray.push(childData.beach);
      });
      next();
    });
  };

  module.beachData = beachData;
})(window);
