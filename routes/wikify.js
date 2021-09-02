const express = require('express');
const validUrl = require('valid-url');
const router = express.Router();


const URL = require('../model/url.js');
const { WikiContents } = require('../utils/grab.js');


/* Wikifying a new URL */
router.post('/', async (req, res) => {
    const url = req.body.url;


    if (!validUrl.isWebUri(url)) {
      res.json({
        error: 'invalid url'
      });
    } else {
      URL.findOne({ original_url: url }, async (error, urlFound) => {
        if (error) {
          console.error(error);
        } else {
          if (!urlFound) { // case url is not in database, add it
            let content = await WikiContents();
            let contents = content.content;
            let pageid = content.pageid;
            let title = content.title;
            // Want to find the wiki url
            newURL = new URL({
              original_url: url,
              wikified_url: contents,
              title: title,
              pageid: pageid,
            });
            newURL.save();
            res.json({
              original_url: newURL.original_url,
              wikified_url: newURL.wikified_url,
              title: newURL.title,
              pageid:  newURL.pageid
              
            });
          } else { // case url is in database, return json
            res.json({
              original_url: urlFound.original_url,
              wikified_url: urlFound.wikified_url,
              title: urlFound.title,
              pageid: urlFound.pageid
            });
          }
        }
      });
    }
  });

module.exports = router;