var beaches = [];

function Beach(opts) {
  for (key in opts) this[key] = opts[key];
};

Beach.prototype.toHtml = function() {
  var source = $('#beach-template').html()
  var template = Handlebars.compile(source);
  return template(this);
};

// beachData.forEach(function(obj) {
//   beaches.push(new Beach(obj));
// });
//
// beaches.forEach(function(obj){
//   $('#beaches').append(obj.toHtml())
// });
