(function(module) {
  var beaches = [];

  function Beach(opts) {
    for (key in opts) this[key] = opts[key];
  };

  Beach.prototype.toHtml = function(sourceTemplate) {
    var template = Handlebars.compile(sourceTemplate.html());
    return template(this);
  };

  Beach.renderSearchResults = function(ctx, next) {
    console.log('renderSearchResults');
    beaches.forEach(function(ele) {
      $('#index .result').empty();
      $('#index .result').append(ele.toHtml($('#beach-template')));
    });
  };

  Beach.renderLocations = function(ctx, next) {
    console.log('renderLocations');
    console.log('beachsArray',beaches)
    $('#location-result').empty();
    beaches.forEach(function(ele) {
      $('#location-result').append(ele.toHtml($('#map-template')));
    });
    $('#location-result').find('h2').hide();
  };

  Beach.renderDetailView = function(ctx, next) {
    console.log('renderDetailView');
    console.log('this is beaches',beaches);
    beaches.forEach(function(ele) {
      $('#detail #map2').insertAfter( '#detail' );
      $('#detail').empty().append(ele.toHtml($('#detail-template')));
    });
    next();
  };

  Beach.addTideData = function(ctx,next){

    console.log('beach',beaches[0]);
    console.log('tide data',ctx.tideData);
    beaches[0].tideData=ctx.tideData;
    next();

  };
  Beach.loadAll = function(ctx, next) {
    beaches = [];
    console.log('this is beaches after i cleared array',beaches);
    console.log('loadAll');
    console.log('beachArray', beachData.beachArray);
    if(ctx.filterByName){
      console.log('filter by stayed',ctx.filterByName);
      console.log('matching beach data', beachData.beachArray);
      beachData.beachArray.forEach(function(ele) {
        console.log(ele.name);
        if (ele.name === ctx.filterByName){
          console.log(ele.name,ctx.filterByName);
          console.log(ele.stationID);
          ctx.stationID = ele.stationID;
          ctx.lng = ele.longitude;
          ctx.lat = ele.latitude;
          beaches.push(new Beach(ele));
        }
      });
    } else {
      beachData.beachArray.forEach(function(ele) {
        beaches.push(new Beach(ele));
      });
    }
    next();
  };


  module.Beach = Beach;
})(window);
