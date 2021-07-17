const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("about", { about: "Sobre o projeto" });
});


module.exports = router;