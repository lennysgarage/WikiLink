const express = require('express');
const router = express.Router({ mergeParams: true });

const URL = require('../model/url.js');


/* convert shorturl to original URL */ 
router.get('/', (req, res) => {
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
  
module.exports = router;