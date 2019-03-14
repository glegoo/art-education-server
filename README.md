# art-education-server

## 导出数据库
> mysqldump -u root -p --databases belton >belton.sql

## 导入数据库
1. 首先建空数据库
> mysql>create database belton;

2. 导入数据库

    (1) 选择数据库
    > mysql>use belton;

    (2) 导入数据（注意sql文件的路径）
    > mysql>source belton.sql;
