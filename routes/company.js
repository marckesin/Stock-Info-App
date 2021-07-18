const express = require('express');
const _ = require('lodash');
const Polygon = require('../models/stock.model.js').polygon;
const Price = require('../models/stock.model.js').price;
const Info = require('../models/stock.model.js').info;

const router = express.Router();

router.get('/', async (req, res) => {
    const cod = _.replace(req.baseUrl, '/', '');
    var polygonInfo = {};
    var yahooInfo = {};

    await Info.findOne({ symbol: cod }, (err, info) => {
        if (!err) {
            try {
                yahooInfo.logo = info.logo_url;
            } catch (error) {

            }
        }
    });

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
            res.render("company", { info: info, polygonInfo: polygonInfo, yahooInfo: yahooInfo });
        } else {
            res.render('no-info', { info: cod });
        }
    });
});


module.exports = router;