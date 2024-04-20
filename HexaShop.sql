CREATE DATABASE HexaShop

USE HexaShop


drop table userInfo

create table userInfo
(
userID int PRIMARY KEY Identity(1,1),
userName varchar(25),
userEmail varchar(30) unique,
userNumber varchar(25) null,
userAddress varchar(30) null,
userPassword varchar(25) check(len(userPassword)>5),
constraint userEmail check(userEmail like '%_@__%.__%'),
)

select * from userInfo


drop table adminInfo
create table adminInfo
(
adminID int PRIMARY KEY Identity(1,1),
adminName varchar(25),
adminNumber varchar(15) unique,
adminEmail varchar(30) unique,
adminPassword varchar(25) check(len(adminPassword)>5),
constraint adminEmail check(adminEmail like '%_@__%.__%'),
)

insert into adminInfo(adminName,adminNumber,adminEmail, adminPassword)
values('Shahid', '01521252236', 'shahidhasan@gmail.com', '12345678')

select * from adminInfo

drop table products
create table products
(
productID int PRIMARY KEY Identity(1,1),
productName varchar(25),
productDetails varchar(200) null,
productType varchar(25) null,
productPrice decimal(10,2) null,
productImageName varchar(200) null,
)
select * from products
delete from products where productID>5

drop table orders
create table orders
(
orderID int PRIMARY KEY Identity(1,1),
userID int,
productID int,
productAmount int,
)
select * from orders

drop table cart
create table cart
(
cartID int PRIMARY KEY Identity(1,1),
userID int FOREIGN KEY REFERENCES userInfo(userID) ,
productID int FOREIGN KEY REFERENCES products(productID) unique,
productAmount int ,
)
select * from cart

