// Initialize and add the map
function initMap() {
  var x = document.getElementById("message");
  var currentPos = { lat: 0, lng: 0};

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);

    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
    return currentPos;
  }

  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
    currentPos.lat = position.coords.latitude;
    currentPos.lng = position.coords.longitude;
  }



  // The map, centered at current pos
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: getLocation(),
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: getLocation(),
    map: map,
  });
}

window.initMap = initMap;