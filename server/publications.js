Meteor.publish('restaurants', function(box) {
  check(box, {
    sw: {
      lat: Number,
      lon: Number
    },
    ne: {
      lat: Number,
      lon: Number
    }
  });

  return Restaurants.find({
    location: {
      $geoWithin: {
        $box: [
          [box.sw.lon, box.sw.lat],
          [box.ne.lon, box.ne.lat]
        ]
      }
    }
  });
});
