var beachData = {};
var beachArray = [];
var keys = [];

var ref = new Firebase('https://ebb-tracker.firebaseio.com/beaches');


// var sync = $firebase(ref.orderByChild("name").equalTo('Carkeek Park'));

// ref.orderByChild("exampleUpdate").on("value", function(snapshot) {
//   console.log(snapshot.key() + " was ", snapshot.val().child("exampleUpdate")," meters tall");
// });
beachArray.push('jack');

ref.once("value", function(snapshot) {
  // The callback function will get called twice, once for "fred" and once for "barney"
  snapshot.forEach(function(childSnapshot) {
    // key will be "fred" the first time and "barney" the second time
    var key = childSnapshot.key();
    console.log('key',key);
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
    console.log('childData',childData);
    beachArray.push(childData.exampleUpdate);

  });
});




// var beaches = ref.orderByChild('exampleUpdate');
//
// ref.on('value', function(snapshot) {
//   console.log('log value',snapshot.val());
//   console.log('log key',snapshot.key());
//   beachArray = snapshot.val().beaches;
// });

// var beachRef = ref.child('beaches');
//   beachRef.push({
//     'exampleUpdate': {'name': 'Cark Par',
//       'longitude': '-122.372298',
//       'latitude': '47.712489',
//       'stationID': '9447130',
//       'url': 'http://www.seattle.gov/parks/environment/carkeek.htm'
//     }
//   });
