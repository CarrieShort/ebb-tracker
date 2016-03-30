(function(module) {
  var locationsController = {};
  locationsController.index = function(ctx, next) {
    console.log('locationsController');
    $('.nav-content').hide();
    $('#location').show();
    next();
  };

  // beachData.retrieveData(Beach.loadAll);

  module.locationsController = locationsController;
})(window);
