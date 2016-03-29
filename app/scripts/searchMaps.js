// function initMap() {
//   var myLatLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
//
//   // Create a map object and specify the DOM element for display.
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: myLatLng,
//     scrollwheel: false,
//     zoom: 4
//   });
//
//   // Create a marker and set its position.
//   var marker = new google.maps.Marker({
//     map: map,
//     position: myLatLng,
//     title: 'Hello World!'
//   });
// }

function initialize() {
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

  // document.getElementById('lat').innerHTML = place.geometry.location.lat();
  // document.getElementById('long').innerHTML = place.geometry.location.lng();

  var myLatLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
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

google.maps.event.addDomListener(window, 'load', initialize);
