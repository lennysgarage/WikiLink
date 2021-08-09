require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const { grabWikiContents } = require('./grab.js');


/** Install and set up Mongoose */
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

// Basic Configuration
const port = process.env.PORT || 3000;

// Start app
const app = express();

// For req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// Defining schema for database
const urlSchema = new mongoose.Schema({
  original_url: String,
  wikified_url: String
});

const URL = mongoose.model("URL", urlSchema);


// Wikifying a new URL
app.post('/wikiurl', async (req, res) => {
  const url = req.body.url;
  //const urlCode = nanoid();
  // Not worrying about duplicate links atm

  console.log(url);
  grabWikiContents().then(wikiURL => {

    console.log(wikiURL);

    if (!validUrl.isWebUri(url)) {
      res.json({
        error: 'invalid url'
      });
    } else {
      URL.findOne({ original_url: url }, (error, urlFound) => {
        if (error) {
          console.log(error);
        } else {
          if (!urlFound) { // case url is not in database, add it
            newUrl = new URL({
              original_url: url,
              wikified_url: wikiURL
            })
            newUrl.save();
            res.json({
              original_url: newUrl.original_url,
              wikified_url: newUrl.wikified_url
            });
          } else { // case url in database, return json
            res.json({
              original_url: urlFound.original_url,
              wikified_url: urlFound.wikified_url
            });
          }
        }
      });
    }
  });
});


// convert shorturl to original URL 
app.get('/wikiurl/:wikified?', (req, res) => {
  URL.findOne({ wikified_url: req.params.wikified }, (error, urlFound) => {
    if (error) {
      console.log(error);
    } else {
      if (!urlFound) {
        return res.status(404).json("URL not found");
      } else {
        return res.redirect(urlFound.original_url);
      }
    }
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
