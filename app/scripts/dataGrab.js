// $(function(module) {
//   var beach = {};
//
//
//   // beach.callData = function() {
//   //   var jsonUrl = 'http://tidesandcurrents.noaa.gov/api/datagetter?callback=?';
//   //   $.getJSON(jsonUrl, {
//   //     begin_date: '20130808 08:00',
//   //     end_date: '20130808 09:00',
//   //     station: '9447130',
//   //     datum: 'MTL',
//   //     product: 'water_temperature',
//   //     units: 'english',
//   //     time_zone: 'gmt',
//   //     interval: 'h',
//   //     format: 'json'
//   //   }).always(function(data) {
//   //     console.log('done', data);
//   //   }).fail(function(e) {
//   //     console.log('this is error', e);
//   //   });
//   //
//   //
//   // };
//
//   // $.ajax({ url:'https://www.ncdc.noaa.gov/cdo-web/api/v2/location',
//   //   headers:{ token:'zOnNnVAWTPfuwrgvemgqLBuIRZCewZpT' }
//   //   })
//   //   .done(function(data,message,xhr) {
//   //     console.log(data)
//   // });
//
//   module.beach = beach;
// })(window);
//
// // $.ajax({ url:'https://tidesandcurrents.noaa.gov/api/datagetter' +
// // '?begin_date=20130808%2015:00&end_date=20130808%2015:06&station=9447130&datum=MTL' +
// // '&product=water_temperature&units=english&time_zone=gmt' +
// // '&application=ports_screen&format=json',
// //   headers:{ token:'zOnNnVAWTPfuwrgvemgqLBuIRZCewZpT' }
// //   })
// //   .done(function(data,message,xhr) {
// //     console.log(data)
// // });
//
//
//
// // {'metadata':{'id':'9447130','name':'Seattle','lat':'47.6026','lon':'-122.3393'}, 'data': [{'t':'2013-08-08 08:00', 'v':'57.4', 'f':'0,0,0'},{'t':'2013-08-08 09:00','v':'56.5', 'f':'0,0,0'}]}
var callbackString = function(e){
  JSON.stringify(e);
};

var callData = function() {
  var jsonUrl = '/tides/';
  $.get(jsonUrl, {
    begin_date: '20130808 08:00',
    end_date: '20130808 09:00',
    station: '9447130',
    datum: 'MTL',
    product: 'water_temperature',
    units: 'english',
    time_zone: 'gmt',
    interval: 'h',
    format: 'json'
  }).done(function(data) {
    console.log('done', data);
  }).fail(function(e) {
    console.log('this is error', e);
  });


};
