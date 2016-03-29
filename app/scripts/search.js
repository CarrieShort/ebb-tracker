var beaches = [];

function Beach (opts) {
  for (key in opts) this[key] = opts[key];
};

Beach.prototype.toHtml = function() {
  var source = $('#beach-template').html();
  var template = Handlebars.compile(source);
  return template(this);
};

Beach.loadSearchResults = function() {
  beaches.forEach(function(ele){
    $('#search').append(ele.toHtml());
  })
};


Beach.loadAll = function(data) {
  console.log("anything",data.beaches);
  data.beaches.forEach(function(ele) {
    beaches.push(new Beach(ele));
  })
};

$.getJSON('../data/beaches.json', function(data) {
  console.log('search data',data);
  localStorage.data = JSON.stringify(data);
  Beach.loadAll(data);
  Beach.loadSearchResults();

});
