var mongoose = require("mongoose");

mongoose.set('debug',true);

var EXPIRES = 60 * 30;
var LocationSchema = new mongoose.Schema({
  userName: {type :String, unique: true},
  created: { type: Date, expires: EXPIRES, default: Date.now() },
  loc: {
    'type': { type: String, enum: "Point", default: "Point" },
    coordinates: { type: [Number] }
  }
})
LocationSchema.index({ loc: "2dsphere" },{ "background": false });
//LocationSchema.index({ category: 1, loc: "2dsphere" });

var Location = mongoose.model("loc", LocationSchema);
var mongoDB = 'mongodb://location:test@ds019708.mlab.com:19708/plaul';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useMongoClient: true });

var testUser = Location({
  userName: "Tester1",
  loc: { coordinates: [12.44, 55.69] }
});

testUser.save(function (err) {
  if (err) {
    return console.log("UPPPPs: " + err);
  }
  console.log("User Saved, Try to find him:");
  setTimeout(function(){
  let query = Location.find({
    loc:
    {
      $near:
      {
        $geometry:
        {
          type: "Point",
          coordinates: [12.50, 55.71]
        },
        $maxDistance: 600000
      }
    }
  })
  query.exec(function (err, docs) {
    if (err) {
      return console.log("Err: " + err);
    }
    console.log("Found: " + JSON.stringify(docs))
  })
},1000);
});