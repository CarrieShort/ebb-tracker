$(function(module) {
  var beach = {};

  $.ajax({ url:'https://www.ncdc.noaa.gov/cdo-web/api/v2/stations/9447130',
    headers:{ token:'zOnNnVAWTPfuwrgvemgqLBuIRZCewZpT' }
    })
    .done(function(data,message,xhr) {
      console.log(data)
  });

  module.beach = beach;
})(window);
