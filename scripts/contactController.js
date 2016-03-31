(function(module) {
  var contactController = {};
  contactController.index = function(ctx, next) {
    console.log('contactController');
    $('.nav-content').hide();
    $('#contact').show();
    next();
  };

  module.contactController = contactController;
})(window);
