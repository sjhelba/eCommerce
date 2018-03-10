const router = require('express').Router()
const {Category, Product} = require('../db/models')
const {adminGatekeeper} = require('./gatekeepers')
module.exports = router

// GET /api/categories/
// res.json array of category objects (that have arrays of product objects attached to each)
router.get('/', (req, res, next) => {
  Category.findAll({
    include: [{all: true}]
  }
    )
    .then(categories => {
      res.json(categories)
    })
    .catch((err) => console.error(err));
})


router.post('/', adminGatekeeper, (req, res, next) => {
  Category.create(req.body)
  .then(res.json.bind(res))
  .catch((err) => console.error(err));
})


router.put('/:id', adminGatekeeper, (req, res, next) => {
  Category.update(req.body)
  .then(res.json.bind(res))
  .catch((err) => console.error(err));
})
