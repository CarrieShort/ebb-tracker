(function(module) {
  var detailView = {};

  detailView.index = function(ctx, next) {
    console.log('detailView');
    $('section').hide();
    $('#detail').show();
    var beachname = ctx.params.name;
    var name = beachname.replace('_', ' ');
    console.log(name);
    // next();
  };


  module.detailView = detailView;
})(window);
