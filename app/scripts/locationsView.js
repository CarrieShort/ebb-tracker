var beachData = {};
var beachArray = [];
var keys = [];

var ref = new Firebase('https://ebb-tracker.firebaseio.com/');

ref.on('value', function(snapshot) {
  console.log(snapshot.val());
  beachArray = snapshot.val().beaches;
});
