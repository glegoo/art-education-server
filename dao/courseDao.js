var mysql = require('mysql')
var $conf = require('../conf/db')
var $sql = require('./courseSqlMapping')
const utils = require('../utils')

var pool = mysql.createPool($conf.mysql)
var databaseError = utils.databaseError

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
      var data = [
        param.course_type,
        param.course_mode,
        param.teacher,
        param.salary,
        param.week,
        param.begin_time,
        param.end_time,
      ]

      connection.query($sql.insert, data, function (err, result) {
        if (err) {
          throw err
        }

        var id = result.insertId

        param.students.forEach(student => {
          student = JSON.parse(student)
          connection.query($sql.addStudentCourse, [student.id, id, student.fee, student.left_times], function (err, result) {
            if (err) {
              throw err
            }
          })
        })

        if (result) {
          result = {
            code: 200,
            msg: '增加成功',
            id: id
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
    var param = req.query || req.params
    if (param.name == null || param.age == null || param.id == null) {
      jsonWrite(res, undefined)
      return
    }

    pool.getConnection(function (err, connection) {
      if (!err) {
        connection.query($sql.update, [param.teacher, param.salary, param.week, param.begin_time, param.end_time, +param.id], function (err, result) {
          if (!err) {
            // 使用页面进行跳转提示
            if (result.affectedRows > 0) {
              // 一对一授课
              if (param.course_mode === 0) {

              } else {
                result = {
                  code: 200,
                  message: '编辑成功'
                }
              }
            } else {
              result = {
                code: -1,
                message: '找不到该课程'
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
        // var sql = 'select * from courses where name LIKE \'%' + param.name + '%\''
        var sql = `select sql_calc_found_rows 
        c.id,
        c.course_type,
        c.course_mode,
        teacher,
        t.name as teacher_name,
        salary,
        c.week,
        c.begin_time,
        c.end_time,
        group_concat(student_id) as students_id,
        group_concat(s.name) as students_name,
        group_concat(fee) as students_fee,
        group_concat(left_times) as students_left_times 
        from 
        student_course as sc 
        left join students as s on s.id=sc.student_id 
        left join courses as c on c.id=sc.course_id 
        left join teachers as t on t.id=c.teacher
        group by(c.id)`
        if (param.sort) {
          sql += param.sort === '-id' ? ' order by id desc' : ' order by id asc'
        }
        if (param.page && param.limit) {
          var start = (param.page - 1) * param.limit
          sql += ' LIMIT ' + start + ',' + param.limit
        }
        // var countSql = 'select COUNT(*) from students where name LIKE \'%' + param.name + '%\';'
        var countSql = 'select found_rows() as count;'
        sql += ';\n' + countSql
        connection.query(sql, function (err, result) {
          if (!err) {
            jsonWrite(res, {
              code: 200,
              data: {
                total: result[1][0].count,
                items: result[0]
              }
            });
            connection.release()
          } else {
            databaseError(res, err)
          }
        })
      }
    })
  },
  queryType: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (!err) {
        connection.query($sql.queryType, function (err, result) {
          if (!err) {
            jsonWrite(res, {
              code: 200,
              data: {
                items: result
              }
            })
            connection.release()
          }
        })
      }
    })
  },
  addType: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        throw err
      }
      // 获取前台页面传过来的参数
      var param = req.query || req.params

      // 建立连接，向表中插入值
      // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',

      connection.query($sql.addType, param.name, function (err, result) {
        if (err) {
          throw err
        }

        if (result) {
          result = {
            code: 200,
            data: '增加成功'
          }
        }

        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result)

        // 释放连接
        connection.release()
      })
    })
  },

  queryCourseTeacher: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (!err) {
        let sql = 'SELECT * FROM courses WHERE courses.id NOT IN (SELECT course_id FROM teacher_course);'
        // let sql = 'SELECT student.* FROM student LEFT JOIN sc ON student.id=sc.sid LEFT JOIN course ON course.id = sc.cid WHERE course.sname IS NULL;'
        connection.query(sql, function (err, result) {
          if (!err) {
            jsonWrite(res, {
              code: 200,
              data: {
                items: result
              }
            })
            connection.release()
          }
        })
      }
    })
  }
}
