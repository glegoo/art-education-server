var student = {
  insert: 'insert into courses(id, course_type, course_mode, teacher, salary, week, begin_time, end_time) values(0,?,?,?,?,?,?,?);',
  update: 'update students set name=?, age=?, sex=?, add_time=? where id=?;',
  delete: 'delete from students where id=?;',
  queryById: 'select * from students where id=?;',
  queryAll: 'select * from students;',
  queryType: 'select * from course_type',
  addType: 'insert into course_type(id, name) values(0,?);',
  addStudentCourse: 'insert into student_course(student_id, course_id, fee, left_times) values(?,?,?,?);',
  addTeacherCourse: 'insert into teacher_course(teacher_id, course_id, salary) values(?,?,?);'
}

module.exports = student
