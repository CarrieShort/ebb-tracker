(function(module) {
  var locationController = {};
  var beachNameArray = [];

  locationController.createBeachNames = function(ctx, next) {
    beachNameArray = beachData.beachArray.map(function(cur, idx, arr) {
      return cur.name;
    });
    next();
  };

  locationController.populateFilters = function(ctx, next) {
    beachNameArray.map(function(cur, idx, arr) {
      var destination = cur.replace(/\s/g,'-');
      var option = '<option value="' + destination + '">' + cur + '</option>';
      $('.chosen-select').append(option);
      return option;
    });
    $('.chosen-select').chosen({max_selected_options: 5});
    next();
  };

  $('.chosen-select').on('change', function(){
    var selectedBeach = $('.result-selected').toArray();
    var mapped =selectedBeach.map(function(cur){
      return cur.textContent;
    });
    mapped.forEach(function(cur){
      $('.beach-summary:contains("'+ cur +'")').show();
    });
  });

  module.locationController = locationController;
}(window));
