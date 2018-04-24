var friendData = require('../data/friends');

module.exports = function(app) {
  app.get('/api/peeps', function(req, res) {
    res.json(friendData);
  });
};
