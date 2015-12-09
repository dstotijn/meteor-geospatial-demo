// Use Leaflet images from bevanhunt:leaflet.
L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

getMapBounds = function(e) {
  return {
    sw: {
      lat: e.target.getBounds().getSouthWest().lat,
      lon: e.target.getBounds().getSouthWest().lng
    },
    ne: {
      lat: e.target.getBounds().getNorthEast().lat,
      lon: e.target.getBounds().getNorthEast().lng
    }
  };
};

handleMarkerClick = function(e) {
  // The clicker marker layer.
  var layer = e.target;
  // The related DOM element in the restaurant listing.
  var el = $('.restaurant[data-mongodb-id=\'' + layer.restaurant._id + '\']');

  // Show pop up balloon with restaurant name above marker.
  layer.bindPopup(layer.restaurant.name).openPopup();

  // Highlight restaurant in listing.
  $('.restaurant').removeClass('bg-silver');
  el.addClass('bg-silver');

  // Scroll to the restaurant related to the clicked marker.
  var offset = el.position().top;
  $('.restaurants .listing').animate({
    scrollTop: $('.restaurants .listing').scrollTop() + offset
  }, 1000);
};
