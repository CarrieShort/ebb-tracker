function initialize() {
  var address = (document.getElementById('address-input'));
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

  document.getElementById('lat').innerHTML = place.geometry.location.lat();
  document.getElementById('long').innerHTML = place.geometry.location.lng();
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
