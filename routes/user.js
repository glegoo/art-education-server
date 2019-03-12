var express = require('express');
var router = express.Router();
 
router.get('/login', function(req, res, next) {
	res.json({
		code: 200,
		msg: '登录成功'
	});
});
 
module.exports = router;