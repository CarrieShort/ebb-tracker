(function(module) {
  var mainView = {};

  mainView.userLat;
  mainView.userLng;

  mainView.index = function(ctx, next) {
    $('section').hide();
    $('#detailMap').hide();
    $('#map').show();
    $('#index .result').show();
    $('#index').show();
    next();
  };


  mainView.map = function(ctx,next) {
    var address = $('#address-input')[0];
    var autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }


      mainView.userLat = place.geometry.location.lat();
      mainView.userLng = place.geometry.location.lng();

      indexController.generateCloseBeaches();
      Beach.loadSearchResults(Beach.renderSearchResults);

      var myLatLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 15
      });

      // Create a marker and set its position.
      var userMarker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'You are Here'
      });
      
      next();
    });
  };

  module.mainView = mainView;
}(window));
