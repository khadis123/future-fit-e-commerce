'use strict';

const express = require('express');
const morgan = require('morgan');

const {
  getItems,
  getItem,
  getCompanies,
  getCompany,
  getCart,
  createCart,
  updateCart,
  confirmOrder,
  
} = require("./handlers")



const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
 /*********************************************************/

 .get('/getItems', getItems)
 .get('/getItem/:_id', getItem)

 .get('/companies', getCompanies)
 .get('/companies/:_id', getCompany)

 .get('/cart/:orderId', getCart)

 .post('/add-item', createCart)
 .patch('/update-cart', updateCart)
 
 .post('/confirmation/:orderId', confirmOrder)

/*********************************************************/

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
