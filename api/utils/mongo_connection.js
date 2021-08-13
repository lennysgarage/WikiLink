const mongoose = require('mongoose');


/* Connect to MongoDB */
mongoose.connect(process.env['MONGO_URI'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("MongoDB database connected successfully");
});


exports.db = db;