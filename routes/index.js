console.clear();
const express = require('express');
const router = express.Router();
const db = require('../db.js');

/* GET home page. */
router.get('/', (req, res, next) => {

  db.findSerie().then((data) => {
    console.log(data);
    res.render('index', { title: 'ExpressA' });
  }).catch(error => console.log(`Error:${error}`));


});

module.exports = router;
