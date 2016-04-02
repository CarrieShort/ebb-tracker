(function(module) {
  var locationView = {};

  locationView.index = function(ctx, next) {
    $('section').hide();
    $('#detailMap').hide();
    $('#map').hide();
    $('#location-result').show();
    $('#location').show();
    next();
  };

  module.locationView = locationView;
}(window));
