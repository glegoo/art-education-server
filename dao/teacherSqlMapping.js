var student = {
  insert: 'insert into teachers(id, name, sex, phone, ps) values(0,?,?,?,?);',
  update: 'update teachers set name=?, sex=?, phone=?, ps=? where id=?;',
  delete: 'delete from teachers where id=?;',
  queryById: 'select * from teachers where id=?;',
  queryAll: 'select * from teachers where name LIKE ? order by id ?;'
}

module.exports = student
