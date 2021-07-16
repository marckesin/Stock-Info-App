const express = require('express');

var router = express.Router();


// Método GET para a página principal
router.get('/', function (req, res, next) {
  // res.setHeader("Content-Type", "text/html");
  res.render('home');
  // res.end();
});


module.exports = router;