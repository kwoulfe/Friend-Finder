var friendData = require('../data/friends');

module.exports = function(app) {
  app.get('/api/survey', function(req, res) {
    res.json(friendData);
  });

  app.post('/api/survey', function(req, res) {
    console.log(req.body);
    function findUserMatch() {
      var userSum = 0;

      for (let h = 0; h < req.body.scores.length; h++) {
        userSum += req.body.scores[h];
      }

      for (let i = 0; i < friendData.length; i++) {
        var bestMatch = {
          friend: friendData[0],
          lowest: 10000
        };
        var runningTotal = 0;
        for (let j = 0; j < friendData[i].scores.length; j++) {
          runningTotal += friendData[i].scores[j];
        }

        if (Math.abs(userSum - runningTotal) < bestMatch.lowest) {
          bestMatch.friend = friendData[i];
          bestMatch.lowest = Math.abs(userSum - runningTotal);
        }

        return bestMatch.friend;
      }
    }
    console.log(findUserMatch());
    friendData.push(req.body);
    res.json(findUserMatch());
  });
};
