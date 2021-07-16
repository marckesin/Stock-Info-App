const express = require('express');
const Price = require('../models/stock.model.js').price;
const Polygon = require('../models/stock.model.js').polygon;

const router = express.Router();

router.post("/", async (req, res) => {
    const remove = req.body.close;

    await Price.deleteOne({ symbol: remove }, (err) => {
        if (!err) {
            console.log(`${remove} removido do banco de dados.`);
        } else {
            console.log(err);
        }
    });

    await Polygon.deleteOne({ symbol: remove }, (err) => {
        if (!err) {
            console.log(`${remove} removido do banco de dados.`);
        } else {
            console.log(err);
        }
    });
    res.redirect("/cards");
});


module.exports = router;