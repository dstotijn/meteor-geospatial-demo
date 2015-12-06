// Subscription handle used in various Template functions.
var handle;
// Default map bounds which encompass Manhattan.
var BOX = {
  sw: {
    lat: 40.68818804944925,
    lon: -74.05574798583986
  },
  ne: {
    lat: 40.81822635589172,
    lon: -73.88408660888673
  }
};

var subscribeWithBounds = function(template, e) {
  // Manually stop subscription if it exists.
  if (handle) {
    handle.stop();
  }

  // Subscribe to all restaurants currently displayed on the map.
  handle = template.subscribe('restaurants', getMapBounds(e));
};

Template.restaurants.onCreated(function() {
  var template = this;

  handle = template.subscribe('restaurants', BOX);

  template.restaurants = function() {
    // Always return all documents from the collection. Because minimongo
    // doesn't support $geoWithin we cannot use client side filtering.
    return Restaurants.find({}, {sort: {name: 1}});
  };
});

Template.restaurants.onRendered(function() {
  var template = this;

  // Use Leaflet images from bevanhunt:leaflet.
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  // Render map with default bounds.
  var map = L.map('map');

  map.on('load', function(e) {
    subscribeWithBounds(template, e);
  });

  map.fitBounds([
      [BOX.sw.lat, BOX.sw.lon], [BOX.ne.lat, BOX.ne.lon]
  ]);

  // Use tiles from the Standard tile layer of OpenStreetMap.
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true
      }).addTo(map);

  // Leaflet event listener for `moveend` event, which is triggered after the
  // map was dragged or zoomed.
  map.on('moveend', function(e) {
    subscribeWithBounds(template, e);
  });

  template.autorun(function() {
    // Before adding markers, remove them all to prevent duplicates.
    map.eachLayer(function(layer) {
      if (layer.options.pane === "markerPane") {
        map.removeLayer(layer);
      }
    });

    // Add a marker layer for each restaurant.
    template.restaurants().forEach(function(restaurant) {
      var marker = L.marker([
          restaurant.location.coordinates[1],
          restaurant.location.coordinates[0],
      ]);
      marker.restaurant = restaurant;
      marker.on('click', function(e) {
        handleMarkerClick(e);
      });
      marker.addTo(map);
    });
  });
});

Template.restaurants.helpers({
  restaurants: function() {
    var template = Template.instance();
    return template.restaurants();
  },
  listIsEmpty: function() {
    var template = Template.instance();
    return (template.restaurants().count() === 0 && handle.ready());
  }
});
