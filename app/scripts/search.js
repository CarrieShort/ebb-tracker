var beaches = [];

function Beach (opts) {
  for (key in opts) this[key] = opts[key];
};

Beach.prototype.toHtml = function() {
  var source = $('#beach-template').html()
  var template = Handlebars.compile(source);
  return template(this);
};

Beach.loadAll = function(data) {
  beaches.forEach(function(ele) {
    Beach.all.push(new Beach(ele));
  })
};

$.getJSON('../data/beaches.json', function(data) {
  console.log('search data',data);
  localStorage.data = JSON.stringify(data);
  Beach.loadAll();
});
