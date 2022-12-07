console.clear();
const express = require('express');
const router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', (req, res, next) => {

  db.findSerie().then((series) => {
    res.render('index', { title: 'ExpressA', series: series });
  }).catch(error => console.log(`Error:${error}`));

});

module.exports = router;
