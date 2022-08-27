const express = require('express');
const router = express.Router();
const path = require('path');

const URL = require('../models/url');

router.get('/:code', async (req, res) => {
    try {
        const url = await URL.findOne({
            urlCode: req.params.code
        })
        if (url) {
            url.clicks++;
            url.save();
            // res.render('redirect', {
            //     sl: url.shortUrl,
            //     link: url.longUrl,
            //     clicks: url.clicks
            // });
            console.log(url.longUrl);
            res.redirect(url.longUrl);
        } else {
            console.log('No URL found');
            res.status(401).sendFile(path.join(__dirname, '..', 'views', '401.html'));
        }
    } catch (err) {
        console.log('Error');
        res.status(401).sendFile(path.join(__dirname, '..', 'views', '401.html'));
    }
});

module.exports = router;