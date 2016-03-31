(function(module) {
  var searchController = {};

  searchController.index = function(ctx, next) {
    $('.nav-content').hide();
    $('#search').show();
    next();
  };

  module.searchController = searchController;
})(window);
