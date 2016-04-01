(function(module) {
  $('body').on('click','.beach-summary',function(){
    var clickedBeach = $(this).data('destination').replace(/\s/g,'-');
    var lng = $(this).data('lng');
    var lat = $(this).data('lat');
    if(lng){
      location.href = 'beach/'+clickedBeach+'/'+lng+'/'+lat;
    } else {
      location.href = 'beach/'+clickedBeach;
    }
  });
  var beaches = [];

  function Beach(opts) {
    for (key in opts) this[key] = opts[key];
  };
  Beach.all = [];


  Beach.prototype.toHtml = function(sourceTemplate) {
    var template = Handlebars.compile(sourceTemplate.html());
    return template(this);
  };

  Beach.renderSearchResults = function(ctx, next) {

    $('#index .result').empty();
    if(Beach.all.length > 0){
      Beach.all.forEach(function(ele) {
        ele.userLng = mainView.userLng;
        ele.userLat = mainView.userLat;
        $('#index .result').append(ele.toHtml($('#beach-template')));
      });
    } else {
      $('#index .result').append('<p>No beaches near this location, enter another address closer to the ocean in the state of Washington</p>');
    }
  };

  Beach.renderLocations = function(ctx, next) {

    $('#location-result').empty();
    beaches.forEach(function(ele) {
      $('#location-result').append(ele.toHtml($('#map-template')));
    });
    $('#location-result').find('.beach-summary').hide();
  };

  Beach.renderDetailView = function(ctx, next) {

    beaches.forEach(function(ele) {
      $('#detail #detailMap').insertAfter('#detail');
      $('#detail').empty().append(ele.toHtml($('#detail-template')));
    });
    next();
  };

  Beach.addTideData = function(ctx, next) {

    beaches[0].tideData = ctx.tideData;
    next();

  };
  Beach.addNextTideData = function(ctx, next) {
    beaches.forEach(function(ele) {
      ele.tideData = ctx.tideData;

    });

    beaches[0].tideData = ctx.tideData;
    next();

  };
  Beach.loadAll = function(ctx, next) {
    beaches = [];

    if (ctx.filterByName) {

      beachData.beachArray.forEach(function(ele) {
        if (ele.name === ctx.filterByName) {

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

  Beach.loadSearchResults = function(callback) {
    Beach.all = [];
    $('#index .result').empty();
    if(indexController.closeBeaches.length > 0){
      indexController.closeBeaches.forEach(function(ele, idx, arr) {
        var stationID = ele.stationID;
        tideData.nextLowTideData(stationID, idx,ele,callback);
      });
    }else{
      callback();
    }
  };

  module.Beach = Beach;
})(window);
