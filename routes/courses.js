var express = require('express')
var router = express.Router()

var courseDao = require('../dao/courseDao')

/* GET Students listing. */
router.get('/', function (req, res, next) {
  // res.render('updateStudent');
  res.send('test')
})

// 增加用户
// TODO 同时支持get,post
router.get('/add', function (req, res, next) {
  courseDao.add(req, res, next)
})

router.get('/list', function (req, res, next) {
  courseDao.queryAll(req, res, next)
})

router.get('/query', function (req, res, next) {
  courseDao.queryById(req, res, next)
})

router.get('/deleteStudent', function (req, res, next) {
  // courseDao.delete(req, res, next);
})

router.get('/update', function (req, res, next) {
  courseDao.update(req, res, next)
})

router.get('/type_list', function (req, res, next) {
  courseDao.queryType(req, res, next)
})

router.get('/add_type', function (req, res, next) {
  courseDao.addType(req, res, next)
})

router.get('/course_teacher_list', function (req, res, next) {
  courseDao.queryCourseTeacher(req, res, next)
})
module.exports = router
