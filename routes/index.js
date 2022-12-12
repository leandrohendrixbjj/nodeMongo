console.clear();

const express = require('express');
const router = express.Router();
const Customer = require('../model/customer.js');

/* GET home page. */
router.get('/', async (req, res, next) => {

  Customer.findSerie().then((customers) => {
    res.render('index', { title: 'ExpressA', customers: customers });
  }).catch(error => console.log(`Error:${error}`));

});

module.exports = router;
