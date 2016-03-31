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
      $('#index').append(ele.toHtml($('#beach-template')));
    });
  };

  Beach.renderDetailView = function(ctx, next) {
    console.log('renderDetailView');
    console.log(beaches);
    beaches.forEach(function(ele) {
      $('#detail').append(ele.toHtml($('#detail-template')));
    });
  };

  Beach.addTideData = function(ctx,next){
    console.log('tide data',ctx.tideData);
    console.log('beach',beaches[0]);
    beaches[0].tideData=ctx.tideData;
    next();

  };
  Beach.loadAll = function(ctx, next) {
    console.log('loadAll');
    console.log('beachArray', beachData.beachArray);
    if(ctx.filterByName){
      console.log('filter by stayed',ctx.filterByName);
      beachData.beachArray.forEach(function(ele) {
        console.log(ele.name);
        if (ele.name === ctx.filterByName){
          console.log(ele.name,ctx.filterByName);
          console.log(ele.stationID);
          ctx.stationID = ele.stationID;
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
