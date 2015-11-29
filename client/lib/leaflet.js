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
