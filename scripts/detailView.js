(function(module) {
  var detailView = {};

  detailView.index = function(ctx, next) {
    console.log('detailView');
    $('section').hide();
    $('#map').hide();
    $('#detail').show();
    var beachname = ctx.params.name;
    ctx.filterByName = beachname.replace('-', ' ');
    ctx.userLat = parseFloat(ctx.params.lat);
    ctx.userLng = parseFloat(ctx.params.lng);
    next();
  };

  detailView.map = function(ctx, next) {
    console.log(ctx.lng);
    console.log(ctx.lat);
    console.log('getting user lat lang', mainView.userLat, mainView.userLng);
    if (ctx.userLat){
      console.log({lat: ctx.userLat, lng: ctx.userLng});
      var userAddress = {lat: ctx.userLat, lng: ctx.userLng};

    } else{
      // if no user data passed use Seattle
      var userAddress = {lat: 47.607819, lng: -122.332137};
    }
    var beachAdress = {lat: parseFloat(ctx.lat), lng: parseFloat(ctx.lng)};

    var map2 = new google.maps.Map(document.getElementById('map2'), {
      center: userAddress,
      scrollwheel: false,
      zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map2
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: beachAdress,
      origin: userAddress,
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
    $( '#map2' ).insertAfter( 'h2' );
    console.log('reached end of map function');
  };



  module.detailView = detailView;
})(window);
