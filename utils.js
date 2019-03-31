exports.databaseError = function (res, err) {
    console.log(err)
    jsonWrite(res, {
        code: -2,
        message: '数据库操作失败'
    })
}