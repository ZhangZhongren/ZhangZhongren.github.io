## brew 安装mysql

1. 安装

  ``` 
   brew install mysql
  ```

2. 启动服务

  ```
    mysql.server start
  ```

3. 执行安全设置并且设置密码

  ```
    mysql_secure_installation
  ```

4. 终端登陆

  ```
    mysql -u root -p
  ```

5. 创建数据库

  ```
    create database {name} character set utf8mb4;
  ```

6. 创建新用户

  ```
    create user '{name}' identified by '{pwd}';
  ```

7. 授权用户

  ```
    grant all privileges on retail_db.* to '{name}';
  ```

8. 查看数据库

  ```
    show databases;
  ```

9. 显示当前数据库的表单

  ```
    show tables
  ```

10. 退出终端 mysql

  ```
  quit;
  ```

11. 停止 mysql 服务

  ```
    mysql.server stop
  ```