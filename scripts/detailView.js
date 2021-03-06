(function(module) {
  var detailView = {};

  detailView.index = function(ctx, next) {
    $('section').hide();
    $('#map').hide();
    $('#detail').show();
    var beachname = ctx.params.name;
    ctx.filterByName = beachname.replace(/-/g , ' ');
    ctx.userLat = parseFloat(ctx.params.lat);
    ctx.userLng = parseFloat(ctx.params.lng);
    next();
  };

  detailView.map = function(ctx, next) {

    if (ctx.userLat){
      var userAddress = {lat: ctx.userLat, lng: ctx.userLng};
    } else{
      // If no user data is passed use Seattle
      var userAddress = {lat: 47.607819, lng: -122.332137};
    }
    var beachAdress = {lat: parseFloat(ctx.lat), lng: parseFloat(ctx.lng)};

    var detailMap = new google.maps.Map(document.getElementById('detailMap'), {
      center: userAddress,
      scrollwheel: false,
      zoom: 7
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: detailMap
    });

    var request = {
      destination: beachAdress,
      origin: userAddress,
      travelMode: google.maps.TravelMode.DRIVING
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
    $( '#detailMap' ).insertAfter( 'h2' );
  };

  module.detailView = detailView;
})(window);
