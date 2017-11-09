const express = require('express');
const register = require("./facade/FriendFacade");
const app = express();
const PORT = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Friend Finder Demo Backend!')
})

app.get('/api/test', function (req, res) {
  res.json({status: true});
})

app.post("/api/friends/register/:distance", function (req, res) {
  var distance = req.params.distance;
  var user = req.body; 
  register(req.userName, user.loc.coordinates, distance, function(err, docs){
    if(err){
      res.status(404);
      return res.json(err);
    }
    return res.json(docs);
  });
});   


app.listen(PORT, function () {
  console.log(`Friend Finder App listening on port ${PORT}`);
})