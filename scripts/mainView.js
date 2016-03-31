(function(module) {
  var mainView = {};

  mainView.index = function(ctx, next) {
    console.log('mainView');
    $('section').hide();
    $('#map').show();
    $('#index').show();
    next();
  };


  function initialize() {
    console.log('initialize fires');
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

      var myLatLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      console.log(myLatLng);
      // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 15
      });

      // Create a marker and set its position.
      var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
      });

    });
  }

  function mapFunction() {

    var chicago = {
      lat: 41.85,
      lng: -87.65
    };
    var indianapolis = {
      lat: 39.79,
      lng: -86.14
    };

    var map2 = new google.maps.Map(document.getElementById('map2'), {
      center: chicago,
      scrollwheel: false,
      zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map2
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: indianapolis,
      origin: chicago,
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  module.mainView = mainView;
}(window))
