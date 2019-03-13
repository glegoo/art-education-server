var express = require('express')
var router = express.Router()

router.post('/login', function (req, res, next) {
  res.json({
    code: 200,
    data: {
      token: 'admin'
    }
  })
})

router.get('/info', function (req, res, next) {
  res.json({
    code: 200,
    data: {
      roles: [
        'admin'
      ],
      name: 'admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  })
})

router.post('/logout', function (req, res, next) {
  res.json({
    code: 200,
    data: 'success'
  })
})

module.exports = router
