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
      try {
        const urlFound = await URL.findOne({ original_url: url });
        let content;
        try {
          content = await WikiContents();
        } catch (err) {
          console.error('Error on requesting content', err);
        }

        let wikified_contents = content.content;
        let pageid = content.pageid;
        let title = content.title;

        try {
          const newURL = new URL({
            original_url: url,
            wikified_url: wikified_contents,
          });
          await newURL.save(); 
          res.json({
            original_url: url,
            wikified_url: wikified_contents,
            title: title,
            pageid:  pageid
          });
        } catch (err) {
          console.error('Error on saving to database', err);
        }
      } catch (error) {
        console.error(error);
      }
    }
});

module.exports = router;
