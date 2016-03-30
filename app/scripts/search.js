(function(module) {
  var beaches = [];

  function Beach(opts) {
    for (key in opts) this[key] = opts[key];
  };

  Beach.prototype.toHtml = function() {
    var source = $('#beach-template').html();
    var template = Handlebars.compile(source);
    return template(this);
  };

  Beach.loadSearchResults = function() {
    beaches.forEach(function(ele) {
      $('#search').append(ele.toHtml());
    })
  };


  Beach.loadAll = function(data) {
    console.log("beachArray", beachData.beachArray);
    beachData.beachArray.forEach(function(ele) {
      beaches.push(new Beach(ele));
    })
    Beach.loadSearchResults();
  };


  module.Beach = Beach;
})(window);
