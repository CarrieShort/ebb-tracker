(function(module) {
  var detailView = {};

  detailView.index = function(ctx, next) {
    console.log('detailView');
    $('section').hide();
    $('#detail').show();
    var beachname = ctx.params.name;
    ctx.filterByName = beachname.replace('_', ' ');
    next();
  };

  detailView.map = function(ctx, next) {
    console.log('detailView');
    $('section').hide();
    $('#detail').show();
    var beachname = ctx.params.name;
    ctx.filterByName = beachname.replace('_', ' ');
    next();
  };


  module.detailView = detailView;
})(window);
