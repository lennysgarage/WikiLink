const mongoose = require('mongoose');


/* Connect to MongoDB - handle initial failure gracefully so the dyno
   stays up (and keeps serving CORS preflights) instead of crashing
   on an unhandled rejection when the DB is unreachable. */
mongoose.connect(process.env['MONGO_URI'], {
    serverSelectionTimeoutMS: 5000
}).catch(err => {
    console.error('MongoDB initial connection failed:', err && err.message ? err.message : err);
});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("MongoDB database connected successfully");
});


exports.db = db;