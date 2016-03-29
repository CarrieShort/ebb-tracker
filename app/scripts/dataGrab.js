// $(function(module) {
//   var beach = {};
  var callbackString = function(e) {
    JSON.stringify(e);
  };

  var callData = function() {
    var jsonUrl = '/tides/';
    $.get(jsonUrl, {
      // end_date: '20120331',
      // range: 48,
      // interval: 'h',
      date: 'today',
      // date: 'latest',
      // range: 12,
      // begin_date: '20130808 08:00',
      // end_date: '20130808 09:00',
      station: '9447130',
      datum: 'MTL',
      product: 'predictions',
      units: 'english',
      time_zone: 'gmt',
      format: 'json'
    }).done(function(data) {
      console.log('done', data);
    }).fail(function(e) {
      console.log('this is error', e);
    });

  };

  var dataToday
  // Need to find next Low Tide, 12 hour increments

  var dataTomorrow
  // Need to find next Low Tide, 12 hour increments

  var dataTwoDays
  // Need to find next Low Tide, 12 hour increments

//   module.beach = beach;
// })(window);
