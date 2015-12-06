# Meteor Geospatial Demo

MongoDB's geospatial features make it pretty easy to build a Meteor application
with location based services. This demo shows a
[Leaflet](http://leafletjs.com/)-powered map and a text based listing of
restaurants, with reactive behavior when the map is updated (dragged, zoomed,
etc.). Using MongoDB's `$geoWithin` geospatial operator (which only works on the
server, *not* with `minimongo`) a restaurants subscription is created based on
the current GPS bounds of the map.

## Demo

A live demo is available [here](http://meteor-geospatial-demo.com/).

## Installation & usage

Install Meteor if haven't done so already:
```
$ curl https://install.meteor.com/ | sh
```
Clone the repository:
```
$ git clone git@github.com:dstotijn/meteor-geospatial-demo.git
```
Change the working directory and run Meteor:
```
$ cd meteor-geospatial-demo
$ meteor
```
Visit the demo at [http://localhost:3000](http://localhost:3000).

## License

[MIT](/LICENSE.md)
