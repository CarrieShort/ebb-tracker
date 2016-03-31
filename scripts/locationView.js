(function(module) {
  var locationView = {};
  var beachNameArray = [];

  locationView.index = function(ctx, next) {
    console.log('locationView');
    $('#location').show();
    $('#map').hide();
    $('#index').hide();
    $('#search').hide();
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
      console.log(destination);
      var option = "<option value='" + destination + "'> " + cur + " </option>"
      console.log(option);
      return option;
    });
    $('.chosen-select').append(beachData.beachArray);
  }

  $('.chosen-select').chosen({
    max_selected_options: 5
  });


  module.locationView = locationView;
}(window))
