const express = require('express');
const router = express.Router({ mergeParams: true });

const URL = require('../model/url.js');

/* convert shorturl to original URL */ 
router.get('/', async (req, res) => {
    try {
        const urlFound = await URL.findOne({ wikified_url: req.params.wikified });
        if (!urlFound) {
            return res.status(404).json("URL not found");
        } else {
            return res.redirect(urlFound.original_url);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("An error occurred while fetching the URL");
    }
});

module.exports = router;
