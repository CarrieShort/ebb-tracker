(function(module) {
  var detailView = {};

  detailView.index = function(ctx, next) {
    console.log('detailView');
    $('section').hide();
    $('#detail').show();
    var beachname = ctx.params.id;
    console.log(beachname);
    // next();
  };


  module.detailView = detailView;
})(window);
