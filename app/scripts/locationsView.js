var ref = new Firebase('https://ebb-tracker.firebaseio.com/');

var beachData = {};
var beachArray = [];
var keys = [];


ref.on('value', function(snapshot) {
  console.log(snapshot.val());
  beachArray = snapshot.val().beaches;
});

var beachRef = ref.child('beaches');
  beachRef.push({
    'exampleUpdate': {'name': 'Cark Par',
      'longitude': '-122.372298',
      'latitude': '47.712489',
      'stationID': '9447130',
      'url': 'http://www.seattle.gov/parks/environment/carkeek.htm'
    }
  });
