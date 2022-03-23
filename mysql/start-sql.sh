#!/bin/bash
DBPWD="pwd"
docker run --name mysql --env="MYSQL_ROOT_PASSWORD=${DBPWD}" --publish 6603:3306 \
--volume=$PWD/data:/var/lib/mysql mysql

# need to change native password to access from nodejs
# ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
# FLUSH PRIVILEGES;

# DB init taking too long. so wait for db to accept connections before sending any request.