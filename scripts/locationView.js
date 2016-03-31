(function(module) {
  var locationView = {};
  var beachNameArray = [];

  locationView.index = function(ctx, next) {
    console.log('locationView');
    $('section').hide();
    $('#location').show();
    $('#location-result').show();
    next();
  };

  locationView.createBeachNames = function(ctx, next) {
    beachNameArray = beachData.beachArray.map(function(cur, idx, arr) {
      console.log(cur.name);
      return cur.name;
    });
    next();
  };

  locationView.populateFilters = function(ctx, next) {
    console.log('beach name array', beachNameArray);
    beachNameArray.map(function(cur, idx, arr) {
      var destination = cur.replace(' ', '_');
      console.log('hello',destination);
      var option = '<option value="' + destination + '"> ' + cur + ' </option>';
      console.log('i',option);
      $('.chosen-select').append(option);
      return option;
    });
    $('.chosen-select').chosen({max_selected_options: 5});
    next();
  };

  // locationView.showSelectedBeach = function(ctx, next) {
  //
  // };




  module.locationView = locationView;
}(window));
