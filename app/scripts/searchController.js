(function(module) {
  var searchController = {};
  searchController.index = function() {
    $('.nav-content').hide();
    $('#search').show();
  };

  module.searchController = searchController;
})(window);
