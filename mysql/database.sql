DROP DATABASE IF EXISTS shop;
CREATE DATABASE IF NOT EXISTS shop;
use shop;
CREATE TABLE IF NOT EXISTS products (
         productID    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
         name         VARCHAR(30)   NOT NULL DEFAULT '',
         quantity     INT UNSIGNED  NOT NULL DEFAULT 0,
         price        DECIMAL(7,2)  NOT NULL DEFAULT 99999.99,
         image        VARCHAR(30)   NOT NULL DEFAULT '',
         PRIMARY KEY  (productID)
       );
INSERT INTO products (name, quantity, price, image) VALUES
         ('Car 1', 10000, 0.48,'car1.jpeg'),
         ('Car 2', 8000, 0.49,'car2.jpeg');
         INSERT INTO products (name, quantity, price, image) VALUES
                  ('Car 5', 100, 0.22,'car4.jpeg'),
                  ('Car 6', 80, 0.33,'car3.jpeg');

CREATE TABLE Customer (
    customerID    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    address VARCHAR(60),
    isadmin BOOLEAN NOT NULL DEFAULT 0,
    PRIMARY KEY  (customerID)
   
);
INSERT INTO Customer (name, password, address, isadmin) VALUES
         ('joe', 'joe', 'cork', false),
         ('mary', 'mary', 'dublin', false),
        ('admin', 'admin', 'cork', true);

INSERT INTO Customer (name, password, address) VALUES
         ('joey', 'joey', 'london'),
         ('fred', 'fred', 'dublin');

CREATE TABLE Orders (
    orderID INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    customerID INT UNSIGNED  NOT NULL,
    saledate VARCHAR(40) NOT NULL,
    PRIMARY KEY  (orderID)

);

CREATE TABLE OrderDetails (
    orderdetailsID INT UNSIGNED  NOT NULL AUTO_INCREMENT,
    orderID INT UNSIGNED  NOT NULL,
    productID INT UNSIGNED  NOT NULL,
    quantity INT UNSIGNED  NOT NULL,
    PRIMARY KEY  (orderdetailsID)

);

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;