var student = {
  insert: 'insert into students(id, name, sex, age, contact, phone, ps) values(0,?,?,?,?,?,?);',
  update: 'update students set name=?, sex=?, age=?, contact=?, phone=?, ps=? where id=?;',
  delete: 'delete from students where id=?;',
  queryById: 'select * from students where id=?;',
  queryAll: 'select * from students;'
}

module.exports = student
