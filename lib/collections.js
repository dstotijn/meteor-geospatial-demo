Restaurants = new Mongo.Collection('restaurants');

if (Meteor.isServer) {
  Meteor.startup(function () {
    Restaurants._ensureIndex({
      'location.coordinates': '2dsphere'
    });
  });
}
