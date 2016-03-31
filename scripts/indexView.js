(function(module) {
  var indexView = {};

  indexView.index = function(ctx, next) {
    console.log('indexView');
    $('section').hide();
    $('#map').show();
    $('#index').show();
    next();
  };


  module.indexView = indexView;
})(window);
