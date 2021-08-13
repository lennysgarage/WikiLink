const express = require('express');
const validUrl = require('valid-url');
const router = express.Router();


const URL = require('../model/url.js');
const { grabWikiContents } = require('../grab.js');

/* Wikifying a new URL */
router.post('/', async (req, res) => {
    const url = req.body.url;
    //const urlCode = nanoid();
    // Not worrying about duplicate links atm
  
    grabWikiContents().then(wikiURL => {
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