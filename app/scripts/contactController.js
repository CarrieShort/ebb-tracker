(function(module) {
  var contactController = {};
  contactController.index = function() {
    $('.nav-content').hide();
    $('#contact').show();
  };

  module.contactController = contactController;
})(window);
