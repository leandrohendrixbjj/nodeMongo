console.clear();
const express = require('express');
const router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', (req, res, next) => {

  db.findSerie((error, data) => {
    if (error) return console.log(`Error:${error}`);
    console.log(data);
  });

  res.render('index', { title: 'ExpressA' });
});

module.exports = router;
