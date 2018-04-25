var friendData = require('../data/friends');

module.exports = function(app) {
  app.get('/api/survey', function(req, res) {
    res.json(friendData);
  });

  //
  app.post('/api/survey', function(req, res) {
    console.log(req.body);

    function findUserMatch(scores) {
      var userSum = 0;

      for (let h = 0; h < scores.length; h++) {
        userSum += +scores[h];
      }
      var bestMatch = {
        friend: null,
        lowest: null
      };
      for (let i = 0; i < friendData.length; i++) {
        var runningTotal = 0;
        for (let j = 0; j < friendData[i].scores.length; j++) {
          runningTotal += friendData[i].scores[j];
        }
        var difference = Math.abs(userSum - runningTotal);
        if (difference < bestMatch.lowest || bestMatch.friend == null) {
          bestMatch.friend = friendData[i];
          bestMatch.lowest = difference;
        }
      }
      return bestMatch.friend;
    }
    var newMatch = findUserMatch(req.body.scores);
    console.log(newMatch);
    friendData.push(req.body);
    res.json(newMatch);
  });
};
