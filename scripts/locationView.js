(function(module) {
  var locationView = {};
  var beachNameArray = [];

  locationView.index = function(ctx, next) {
    $('section').hide();
    $('#location-result').show();
    $('#location').show();
    next();
  };

  locationView.createBeachNames = function(ctx, next) {
    beachNameArray = beachData.beachArray.map(function(cur, idx, arr) {
      return cur.name;
    });
    next();
  };

  locationView.populateFilters = function(ctx, next) {
    beachNameArray.map(function(cur, idx, arr) {
      var destination = cur.replace(' ', '_');
      var option = '<option value="' + destination + '">' + cur + '</option>';
      $('.chosen-select').append(option);
      return option;
    });
    $('.chosen-select').chosen({max_selected_options: 5});
    next();
  };

  $('.chosen-select').on('change', function(){
    var selectedBeach = $('.result-selected').toArray();
    var mapped =things.map(function(cur){
      return cur.textContent;
    });
    mapped.forEach(function(cur){
      $('.beach-title:contains("'+ cur +'")').show();
    });
  });

  module.locationView = locationView;
}(window));
