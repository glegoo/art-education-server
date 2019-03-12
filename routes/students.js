var express = require('express');
var router = express.Router();
 
var studentDao = require('../dao/studentDao');
 
/* GET Students listing. */
router.get('/', function(req, res, next) {
	// res.render('updateStudent');
	res.send('test');
});
 
// 增加用户
//TODO 同时支持get,post
router.get('/add', function(req, res, next) {
	studentDao.add(req, res, next);
});
 
router.get('/queryAll', function(req, res, next) {
	studentDao.queryAll(req, res, next);
});
 
router.get('/query', function(req, res, next) {
	studentDao.queryById(req, res, next);
});
 
router.get('/deleteStudent', function(req, res, next) {
	// studentDao.delete(req, res, next);
});
 
router.post('/update', function(req, res, next) {
	studentDao.update(req, res, next);
});
 
module.exports = router;