var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
	res.json({
		code: 200,
		msg: '登录成功'
	});
});

module.exports = router;