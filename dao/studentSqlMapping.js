var student = {
    insert: 'insert into students(id, name, age, sex) values(0,?,?,?,?);',
    update: 'update students set name=?, age=?, sex=?, add_time=?, where id=?;',
    delete: 'delete from students where id=?;',
    queryById: 'select * from students where id=?;',
    queryAll: 'select * from students;'
};

module.exports = student;