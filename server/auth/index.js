const router = require('express').Router()
const {adminGatekeeper} = require('../api/gatekeepers')
const Admin = require('../db/models/admin')
module.exports = router

router.post('/login', (req, res, next) => {
  Admin.findOne({where: {username: req.body.username}})
    .then(admin => {
      if (!admin || !admin.correctPassword(req.body.password)) {
        res.status(401).send('No admin found with given credentials')
      } else {
        req.login(admin, err => err ? next(err) : res.json(admin))
      }
    })
    .catch(next)
})

router.post('/newAdmin', adminGatekeeper, (req, res, next) => {
  Admin.create(req.body)
    .then(admin => {
      res.json(admin)
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {next(err)}
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', adminGatekeeper, (req, res) => {
  res.json(req.admin)
})
