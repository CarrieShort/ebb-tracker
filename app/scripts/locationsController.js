(function(module) {
  var locationsController = {};
  locationsController.index = function() {
    $('.nav-content').hide();
    $('#location').show();
  };

  beachData.retrieveData(Beach.loadAll);

  module.locationsController = locationsController;
})(window);
