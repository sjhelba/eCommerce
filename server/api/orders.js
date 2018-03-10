const router = require('express').Router()
const {Order} = require('../db/models')
const {adminGatekeeper} = require('./gatekeepers')
module.exports = router



// GET /api/orders/
router.get('/', adminGatekeeper, (req, res, next) => {  //must be admin
  Order.findAll()
  .then(categories => {
    res.json(categories)
  })
  .catch((err) => console.error(err));
})

// POST /api/orders/
router.post('/', (req, res, next) => {
  const {orderObj, userId, shippingDetails} = req.body

  Order.createOrder(orderObj, userId, req.sessionID, shippingDetails);

  res.sendStatus(201);
})

