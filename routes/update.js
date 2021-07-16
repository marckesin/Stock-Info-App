const express = require('express');
const https = require('https');
const _ = require('lodash');
const Price = require('../models/stock.model.js').price;

const router = express.Router();

router.post('/', (req, res) => {
    const update = req.body.update;
    const lista = update.split(' '); //id + código da ação
    const yahooFinance = `${process.env.YAHOO_API_ENDPOINT}${lista[1]}?modules=price`;

    https.get(yahooFinance, (response) => {
        let chunks = [];
        response.on("data", (data) => {
            chunks.push(data);
        }).on('end', async () => {
            const data = Buffer.concat(chunks);
            const dados = JSON.parse(data);
            const result = dados.quoteSummary.result[0].price;

            await Price.updateOne({ _id: lista[0] }, {
                regularMarketChange: (result.regularMarketChange.raw).toFixed(2),
                regularMarketChangePercent: ((result.regularMarketChangePercent.raw) * 100).toFixed(2),
                regularMarketDayHigh: (result.regularMarketDayHigh.raw).toFixed(2),
                regularMarketDayLow: (result.regularMarketDayLow.raw).toFixed(2),
                regularMarketOpen: (result.regularMarketOpen.raw).toFixed(2),
                regularMarketPreviousClose: (result.regularMarketPreviousClose.raw).toFixed(2),
                regularMarketPrice: (result.regularMarketPrice.raw).toFixed(2),
                regularMarketTime: new Date(result.regularMarketTime * 1000).getTime(),
                regularMarketVolume: result.regularMarketVolume.fmt,
                __v: 1000
            }).catch((err) => {
                console.log(`Erro no update: ${err}`);
            });
        });
    });
    res.redirect("/cards");
});


module.exports = router;