(function(module) {
  var locationView = {};
  var beachNameArray = [];

  locationView.index = function(ctx, next) {
    console.log('locationView');
    $('section').hide();
    $('#location-result').show();
    $('#location').show();
    // $('#location-result').find('h2').hide();
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
      var option = '<option value="' + destination + '">' + cur + '</option>';
      console.log('i',option);
      $('.chosen-select').append(option);
      return option;
    });
    $('.chosen-select').chosen({max_selected_options: 5});
    next();
  };

  $('.chosen-select').on('change', function(){
    // console.log('this',$('.result-selected').toArray().text);
    var things = $('.result-selected').toArray();
    console.log(things);
    var mapped =things.map(function(cur){
      // console.log('i hate this', cur.textContent);
      return cur.textContent;
    });
    console.log('this is mapped', mapped);
    mapped.forEach(function(cur){
      console.log('.beach-title:contains("'+ cur +'")');
      $('.beach-title:contains("'+ cur +'")').show();
    });
    console.log('this is things',things);
    // $(this).find('.beach-title').show();
  });
  // locationView.showSelectedBeach = function(ctx, next) {
  //
  // };




  module.locationView = locationView;
}(window));
