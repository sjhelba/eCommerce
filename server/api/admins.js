const router = require('express').Router()
const {Admin} = require('../db/models')
const {adminGatekeeper} = require('./gatekeepers')

module.exports = router

router.get('/', adminGatekeeper, (req, res, next) => {
  Admin.findAll({
    // only send these attributes
    attributes: ['id', 'username']
  })
    .then(admins => res.json(admins))
    .catch(err => console.error(err))
})

router.post('/', adminGatekeeper, (req, res, next) => {
  Admin.create(req.body)
  .then(res.json.bind(res))
  .catch(err => console.error(err))
})


router.delete('/:id', adminGatekeeper, (req, res, next) => {
  Admin.destroy({
    where: { id: req.params.id }
  })
  .then(res.json.bind(res))
  .catch(err => console.error(err))
})
