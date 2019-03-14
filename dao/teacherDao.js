var mysql = require('mysql')
var $conf = require('../conf/db')
var $sql = require('./teacherSqlMapping')

var pool = mysql.createPool($conf.mysql)

var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

var databaseError = function (res, err) {
  console.log(err)
  jsonWrite(res, {
    code: -2,
    message: '数据库操作失败'
  })
}

module.exports = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        throw err
      }
      // 获取前台页面传过来的参数
      var param = req.query || req.params

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',

      connection.query($sql.insert, [param.name, param.sex, param.phone, param.ps], function (err, result) {
        if (err) {
          throw err
        }

        if (result) {
          result = {
            code: 200,
            msg: '增加成功',
            id: result.insertId
          }
        }

        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result)

        // 释放连接
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    // delete by Id
    pool.getConnection(function (err, connection) {
      if (!err) {
        var id = +req.query.id
        connection.query($sql.delete, id, function (err, result) {
          if (!err) {
            if (result.affectedRows > 0) {
              result = {
                code: 200,
                msg: '删除成功'
              }
            } else {
              result = void 0
            }
            jsonWrite(res, result)
            connection.release()
          }
        })
      }
    })
  },
  update: function (req, res, next) {
    // update by id
    // 为了简单，要求同时传name和age两个参数
    var param = req.query || req.params
    if (param.name == null || param.id == null) {
      jsonWrite(res, undefined)
      return
    }

    pool.getConnection(function (err, connection) {
      if (!err) {
        connection.query($sql.update, [param.name, param.sex, param.phone, param.ps, +param.id], function (err, result) {
          if (!err) {
            // 使用页面进行跳转提示
            if (result.affectedRows > 0) {
              result = {
                code: 200,
                message: '编辑成功'
              }
            } else {
              result = {
                code: -1,
                message: '找不到该学员'
              }
            }
            jsonWrite(res, result)
            connection.release()
          } else {
            databaseError(res, err)
          }
        })
      }
    })
  },
  queryById: function (req, res, next) {
    var id = +req.query.id // 为了拼凑正确的sql语句，这里要转下整数
    pool.getConnection(function (err, connection) {
      if (!err) {
        connection.query($sql.queryById, id, function (err, result) {
          if (!err) {
            jsonWrite(res, result)
            connection.release()
          }
        })
      }
    })
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (!err) {
        var param = req.query || req.params
        var sql = 'select * from teachers where name LIKE \'%' + param.name + '%\' order by id '
        sql += param.sort === '-id' ? 'desc' : 'asc'
        var start = (param.page - 1) * param.limit
        sql += ' LIMIT ' + start + ',' + param.limit
        connection.query(sql, function (err, result) {
          if (!err) {
            var countSql = 'select COUNT(*) from teachers where name LIKE \'%' + param.name + '%\''
            connection.query(countSql, function (err, countResult) {
              if (!err) {
                jsonWrite(res, {
                  code: 200,
                  data: {
                    total: countResult[0]['COUNT(*)'],
                    items: result
                  }
                })
              } else {
                databaseError(res, err)
              }
            })
            connection.release()
          } else {
            databaseError(res, err)
          }
        })
      }
    })
  }
}
