var mongoose = require("mongoose");

var EXPIRES = 60 * 30;
var LocationSchema = new mongoose.Schema({
  userName: {type :String, unique: true},
  created: { type: Date, expires: EXPIRES, default: Date.now() },
  loc: {
    'type': { type: String, enum: "Point", default: "Point" },
     coordinates: { type: [Number] }
  } 
})

//This did NOT work for me, set the index directly on DB as explained in exercise
LocationSchema.index({loc: "2dsphere" },{ "background": false });

//Replace with URL to your own mongolab-db
const MONGO_DB = 'mongodb://location:test@ds019708.mlab.com:19708/plaul';
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB, { useMongoClient: true });

var Location = mongoose.model("location", LocationSchema);

