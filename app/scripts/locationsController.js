(function(module) {
  var locationsController = {};
  locationsController.index = function() {
    $('.nav-content').hide();
    $('#location').show();
  };

  module.locationsController = locationsController;
})(window);
