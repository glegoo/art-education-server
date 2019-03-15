var student = {
  insert: 'insert into students(id, name, sex, age, contact, phone, ps) values(0,?,?,?,?,?,?);',
  update: 'update students set name=?, sex=?, age=?, contact=?, phone=?, ps=? where id=?;',
  delete: 'delete from students where id=?;',
  queryById: 'select * from students where id=?;',
  queryByName: 'select * from students where name=?;',
  queryAll: 'select * from students where name LIKE ? order by id ?;'
}

module.exports = student
