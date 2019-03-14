var express = require('express')
var router = express.Router()

var teacherDao = require('../dao/teacherDao')

/* GET Students listing. */
router.get('/', function (req, res, next) {
  // res.render('updateStudent');
  res.send('test')
})

// 增加用户
// TODO 同时支持get,post
router.get('/add', function (req, res, next) {
  teacherDao.add(req, res, next)
})

router.get('/list', function (req, res, next) {
  teacherDao.queryAll(req, res, next)
})

router.get('/query', function (req, res, next) {
  teacherDao.queryById(req, res, next)
})

router.get('/deleteStudent', function (req, res, next) {
  // teacherDao.delete(req, res, next);
})

router.get('/update', function (req, res, next) {
  teacherDao.update(req, res, next)
})

module.exports = router
