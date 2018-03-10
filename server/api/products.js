const router = require('express').Router()
const {Product, Category} = require('../db/models')
const {adminGatekeeper} = require('./gatekeepers')

module.exports = router


// GET /api/products/
// res.json array of products objects
router.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.json(products)
  })
  .catch((err) => console.error(err));
})

// GET /api/products/:id
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, {
    include: [{
      model: Category
    }]
  })
  .then(product => {
    res.json(product)
  })
  .catch((err) => console.error(err));
})

router.post('/', adminGatekeeper, (req, res, next) => {
  Product.create(req.body)
  .then(res.json.bind(res))
  .catch((err) => console.error(err));
})

router.put('/:id', adminGatekeeper, (req, res, next) => {
  Product.update(req.body)
  .then(res.json.bind(res))
  .catch((err) => console.error(err));
})
