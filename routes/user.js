var express = require('express');
var router = express.Router();
 
router.get('/login', function(req, res, next) {
	studentDao.add(req, res, next);
});
 
module.exports = router;