const express = require('express');
const _ = require('lodash');
const Polygon = require('../models/stock.model.js').polygon;
const Price = require('../models/stock.model.js').price;

const router = express.Router();

router.get('/', async (req, res) => {
    const cod = _.replace(req.baseUrl, '/', '');
    var polygonInfo = {};

    await Polygon.findOne({ symbol: cod }, (err, info) => {
        if (!err) {
            try {
                polygonInfo.logo = info.logo;
                polygonInfo.ceo = info.ceo;
                polygonInfo.similar = info.similar;
                polygonInfo.tags = info.tags;
            } catch (error) {
                // console.log(error);
            }
        }
    });

    await Price.findOne({ symbol: cod }, (err, info) => {
        if (!err && info) {
            res.render("company", { info: info, polygonInfo: polygonInfo });
        } else {
            res.render('no-info', { info: cod });
        }
    });
});


module.exports = router;