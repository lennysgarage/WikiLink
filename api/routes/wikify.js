const express = require('express');
const router = express.Router();

const URL = require('../model/url.js');

/* Wikifying a new URL */
app.post('/', async (req, res) => {
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

module.exports = router;