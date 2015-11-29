// Insert restaurant fixtures if the Restaurants collection is empty.
Meteor.startup(function() {
  if (Restaurants.find().count() === 0) {
    var restaurantFixtures = JSON.parse(
        Assets.getText('fixtures/restaurants.json'));

    _.each(restaurantFixtures, function(restaurant) {
      Restaurants.insert(restaurant);
    });
  }
});
