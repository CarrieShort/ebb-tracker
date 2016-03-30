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
    })
  };


  Beach.loadAll = function(ctx, next) {
    console.log('loadAll');
    console.log("beachArray", beachData.beachArray);
    beachData.beachArray.forEach(function(ele) {
      beaches.push(new Beach(ele));
    })
    next();
  };


  module.Beach = Beach;
})(window);
