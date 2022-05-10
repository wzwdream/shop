-- 设置客户端连接服务器端编码为UTF8
SET NAMES UTF8;
-- 丢弃数据库,如果存在
DROP DATABASE IF EXISTS xz_shop;
-- 创建一个新的数据库 设置存储编码为UTF8
CREATE DATABASE xz_shop CHARSET=UTF8;
-- #进入创建的数据库
USE xz_shop;
-- 1.创建用户表
CREATE TABLE xz_user
(
	user_id int NOT NULL PRIMARY KEY ,/*不为空 是主键 自增、唯一*/
	username VARCHAR
(20) NOT NULL UNIQUE,/*不为空  唯一*/
	user_avartar VARCHAR
(50),/*为空  默认值（图片）*/
	phone VARCHAR
(11) NOT NULL UNIQUE,/*不为空 唯一*/
	password VARCHAR
(20) NOT NULL,/*不为空 MD5*/
	email VARCHAR
(21) NOT NULL UNIQUE,/*不为空 唯一*/
	type VARCHAR(20)
);
-- 1.1用户表数据
INSERT INTO xz_user
VALUES('1', 'dingding', 'http://127.0.0.1:3000/user50.png', '18308797380', '123456', '124378@qq.com', '01');
INSERT INTO xz_user
VALUES('2', 'dengdeng', 'http://127.0.0.1:3000/user50.png', '13456677899', '123456', '25362@qq.com', '01');
INSERT INTO xz_user
VALUES('3', 'drngdrng', 'http://127.0.0.1:3000/user50.png', '13277699804', '123456', '63721@qq.com','01');
INSERT INTO xz_user
VALUES('4', 'dtngdtng', 'http://127.0.0.1:3000/user50.png', '15288655424', '123456', '162317@qq.com', '01');
INSERT INTO xz_user
VALUES('5', 'admin', 'http://127.0.0.1:3000/user50.png', '18308999', '123456', '145555@qq.com', '02');


-- 2.电脑种类表
CREATE TABLE computers
(
	computer_id INT NOT NULL PRIMARY KEY,
	/*不为空 主键 唯一、自增*/
	computer_name VARCHAR
(21) NOT NULL/*不为空*/
);
-- 2.1电脑种类表
INSERT INTO computers
VALUES('1', '惠普');
INSERT INTO computers
VALUES('2', '小米');
INSERT INTO computers
VALUES('3', '华为');
INSERT INTO computers
VALUES('4', '苹果');
INSERT INTO computers
VALUES('5', '联想');
INSERT INTO computers
VALUES('6', '华硕');


-- 3.电脑配件种类表
CREATE TABLE parts
(
	parts_id INT NOT NULL PRIMARY KEY,
	/*不为空 主键 唯一、自增*/
	parts_name VARCHAR
(21) NOT NULL/*不为空*/
);
-- 3.1电脑配件种类表
INSERT INTO parts
VALUES('1', '苹果');
INSERT INTO parts
VALUES('2', '技嘉');
INSERT INTO parts
VALUES('3', '罗技');
INSERT INTO parts
VALUES('4', '魅族');
INSERT INTO parts
VALUES('5', '飞利浦');
INSERT INTO parts
VALUES('6', '品胜');
INSERT INTO parts
VALUES('7', '三星');
INSERT INTO parts
VALUES('8', '闪迪');
INSERT INTO parts
VALUES('9', '东芝');
INSERT INTO parts
VALUES('10', '希捷');
INSERT INTO parts
VALUES('11', '华为');
INSERT INTO parts
VALUES('12', '小米');


-- 4.游戏外设种类表
CREATE TABLE peripheral
(
	peripheral_id INT NOT NULL PRIMARY KEY,
	/*不为空 主键 唯一、自增*/
	peripheral_name VARCHAR
(21) NOT NULL/*不为空*/
);
-- 4.1游戏外设种类表
INSERT INTO peripheral
VALUES('1', '罗技');
INSERT INTO peripheral
VALUES('2', '惠普');
INSERT INTO peripheral
VALUES('3', '微星');
INSERT INTO peripheral
VALUES('4', '雷蛇');
INSERT INTO peripheral
VALUES('5', '希捷');
INSERT INTO peripheral
VALUES('6', '技嘉');
INSERT INTO peripheral
VALUES('7', '飞利浦');
INSERT INTO peripheral
VALUES('8', '品胜');
INSERT INTO peripheral
VALUES('9', '三星');
INSERT INTO peripheral
VALUES('10', '小米');
INSERT INTO peripheral
VALUES('11', '闪迪');
INSERT INTO peripheral
VALUES('12', '东芝');


-- 5.电脑数据表
CREATE TABLE xz_computer
(
	computer_id int NOT NULL PRIMARY KEY AUTO_INCREMENT ,/*不为空 是主键 自增、唯一*/
	computer_name VARCHAR
(40) NOT NULL,/*不为空  唯一*/
	computer_family VARCHAR
(5),/*品牌*/
	price VARCHAR
(10) NOT NULL,/*不为空 唯一*/
	cpu VARCHAR  
(20) NOT NULL,/*cpu*/
	graphicsSize VARCHAR
(21) NOT NULL,/*显卡内存*/
	color VARCHAR
(21) NOT NULL,/*颜色*/
	memory VARCHAR
(21) NOT NULL,/*内存*/
	size VARCHAR
(21) NOT NULL,/*大小*/
	resolving_power VARCHAR
(21) NOT NULL,/*分辨率*/
	graphicsType VARCHAR
(21) NOT NULL,/*显卡类型*/
	computer_system VARCHAR
(21) NOT NULL,/*系统*/
	classification VARCHAR
(21) NOT NULL,/*分类*/
	hard_disk VARCHAR
(21) NOT NULL,/*硬盘*/
	computers_img VARCHAR
(50) NOT NULL,/*图片路径*/
	ctype INT
(5) NOT NULL
);

-- 5.1电脑数据表
-- 联想数据
INSERT INTO xz_computer
VALUES('1', 'Lenovo/联想扬天V14', '5', '3800', 'AMD R3 3250U', '4G', '银灰色', '8G', '14英寸', '1920x1080', '核芯显卡', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/lx01.jpg', 1);
INSERT INTO xz_computer
VALUES('2', 'Lenovo/联想小新15', '5', '4000', '英特尔 酷睿 i5-10210U', '8G', '黑色', '8G', '15.6英寸', '1920x1080', ' NVIDIA MX350', 'windows 10', '轻薄本', '128G固态硬盘', 'http://127.0.0.1:3000/lx002.jpg', 1);
INSERT INTO xz_computer
VALUES('3', '联想ThinkPad E14', '5', '5000', '英特尔 酷睿 i5-10210U', '2G', 'E14黑色', '16G ', '14英寸', '1920x1080', ' AMD Radeon R6(Mullins)', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/lx03.jpg', 1);
INSERT INTO xz_computer
VALUES('4', 'Lenovo/联想ThinkPad E15', '5', '7000', ' NVIDIA MX450', '4G', '银灰色', '8G', '15.6英寸', '1920x1080', '英特尔 酷睿 i7-1165G7', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/lx04.webp', 1);
INSERT INTO xz_computer
VALUES('5', 'Lenovo/联想 拯救者', '5', '9200', ' AMD R7 5800H', '8G', '幻影黑', '8G', '16英寸', '1920x1080', ' NVIDIA GeForce RTX3060', 'windows 10', '轻薄游戏笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/lx005.webp', 1);
-- 惠普
INSERT INTO xz_computer
VALUES('6', 'HP/惠普 星 14s-', '1', '3999', 'AMD R3 3250U', '4G', '银灰色', '16G', '14英寸', '1920x1080', '核芯显卡', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/hp001.webp', 1);
INSERT INTO xz_computer
VALUES('7', 'HP/惠普 薄锐envy 15', '1', '8599', '英特尔 酷睿 i5-10300H', '4G', '银色', '32G', '15.6英寸', '1920x1080', ' NVIDIA GeForce GTX 1650 Ti', 'windows 10', '轻薄游戏笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/hp002.webp', 1);
INSERT INTO xz_computer
VALUES('8', 'HP/惠普 星15 -青春版', '1', '4199', '英特尔 酷睿 i5-1035G1', '4G', '银灰色', '16G', '15.6英寸', '1920x1080', 'NVIDIA MX330', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/hp003.webp', 1);
INSERT INTO xz_computer
VALUES('9', 'HP/惠普 星系列', '1', '4549', '英特尔 酷睿 i5-1135G7', '8G', '银灰色', '8G', '15.6英寸', '1920x1080', 'NVIDIA MX450', 'windows 10', '轻薄游戏笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/hp004.webp', 1);
INSERT INTO xz_computer
VALUES('10', 'HP/惠普 惠普暗影6代', '1', '6199', '英特尔 酷睿 i5-10300H', '4G', '银灰色', '16G', '15.6英寸', '1920x1080', ' NVIDIA GeForce GTX1650', 'windows 10', '轻薄游戏笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/hp0005.webp', 1);

-- 华硕
INSERT INTO xz_computer
VALUES('11', 'Asus/华硕 vivobook 新款', '6', '6199', ' 英特尔 酷睿 i5-1135G7', '8G', '银灰色', '16G', '15.6英寸', '1920x1080', ' NVIDIA MX330', 'windows 10', '新款轻薄本笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/hs001.webp', 1);
INSERT INTO xz_computer
VALUES('12', 'Asus/华硕 华硕VivoBooK1', '6', '5999', ' 英特尔 酷睿 i5-1135G7', '8G', '黑色', '16G', '15.6英寸', '1920x1080', 'NVIDIA MX330', 'windows 10', '轻薄本', '512G固态硬盘', 'http://127.0.0.1:3000/hs002.webp', 1);
INSERT INTO xz_computer
VALUES('13', ' Asus/华硕 天选', '6', '6799', 'AMD R7 4800H', '2G', '钛灰', '16G ', '14英寸', '1920x1080', '  NVIDIA GeForce GTX 165', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/hs003.webp', 1);
INSERT INTO xz_computer
VALUES('14', 'Asus/华硕 VivoBook 4000', '6', '6099', '  英特尔 酷睿 i7-1065G7', '4G', '银灰色', '8G', '14英寸', '1920x1080', ' NVIDIA MX330', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/hs004.webp', 1);
INSERT INTO xz_computer
VALUES('15', 'Asus/华硕', '6', '9299', ' AMD R7 4800H', '8G', '幻影黑', '8G', '16英寸', '1920x1080', 'NVIDIA GeForce RTX2060', 'windows 10', '轻薄游戏笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/hs0005.webp', 1);

-- 苹果
INSERT INTO xz_computer
VALUES('16', ' Apple/苹果 MacBook Air', '4', '8592', ' Apple M1', '8G', '银灰色', '16G', '13.3英寸', '1440x900', ' 核芯显卡', 'Mac OS', '新款轻薄本笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/pg001.webp', 1);
INSERT INTO xz_computer
VALUES('17', 'Apple/苹果 MacBook Pro', '4', '11269', ' Apple M1', '8G', '黑色', '16G', '15.6英寸', '1920x1080', '核芯显卡', 'Mac OS', '轻薄本', '128G固态硬盘', 'http://127.0.0.1:3000/pg002.webp', 1);
INSERT INTO xz_computer
VALUES('18', '苹果 MacBook Pro M1', '4', '6799', 'Apple M1', '2G', '钛灰', '16G ', '14英寸', '1920x1080', '核芯显卡', 'Mac OS', '轻薄笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/pg003.webp', 1);

-- 华为
INSERT INTO xz_computer
VALUES('19', 'Huawei/华为 MateBook 14', '3', '6099', ' 英特尔 酷睿 i5-1135G7', '8G', '银灰色', '16G', '15.6英寸', '1920x1080', ' NVIDIA MX330', 'windows 10', '新款轻薄本笔记本电脑', '512G固态硬盘', 'http://127.0.0.1:3000/hw001.jpg', 1);
INSERT INTO xz_computer
VALUES('20', 'Huawei/华为笔记本电脑MateBook D14', '3', '4799', ' 英特尔 酷睿 i5-1135G7', '8G', '黑色', '16G', '15.6英寸', '1920x1080', 'NVIDIA MX330', 'windows 10', '轻薄本', '512G固态硬盘', 'http://127.0.0.1:3000/hw002.jpg', 1);
INSERT INTO xz_computer
VALUES('21', '华为MateBook 13', '3', '6399', 'AMD R7 4800H', '2G', '钛灰', '16G ', '14英寸', '1920x1080', '  NVIDIA GeForce GTX 165', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/hw003.jpg', 1);
INSERT INTO xz_computer
VALUES('22', '华为Matebook X Pro', '3', '13598', '  英特尔 酷睿 i7-1065G7', '4G', '银灰色', '8G', '14英寸', '1920x1080', ' NVIDIA MX330', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/hw004.jpg', 1);

-- 小米
INSERT INTO xz_computer
VALUES('23', '小米/RedmiBook Pro 15', '2', '4999', ' 英特尔 酷睿 i5-11300H', '2G', '星光灰', '16G', '15英寸', '3200x2000', ' NVIDIA MX450', 'windows 10', '超轻薄笔记本', '256G固态硬盘', 'http://127.0.0.1:3000/xm001.jpg', 1);
INSERT INTO xz_computer
VALUES('24', '小米/RedmiBook Pro 14', '2', '4599', ' 英特尔 酷睿 i5-1135G7', '2G', '黑色', '8G', '15.6英寸', '1920x1080', 'NVIDIA MX330', 'windows 10', '轻薄本', '512G固态硬盘', 'http://127.0.0.1:3000/xm002.jpg', 1);
INSERT INTO xz_computer
VALUES('25', '小米/RedmiBook 14S ', '2', '3999', ' AMD R5-4500U', '2G', '钛灰', '16G ', '14英寸', '1920x1080', '核芯显卡', 'windows 10', '轻薄游戏笔记本电脑', '256G固态硬盘', 'http://127.0.0.1:3000/xm003.jpg', 1);



-- 6.电脑数据表
CREATE TABLE computer_details
(
	details_id int NOT NULL PRIMARY KEY AUTO_INCREMENT ,/*不为空 是主键 自增、唯一*/
	computer_id int
(10) NOT NULL,/*不为空  唯一*/
	details_img VARCHAR
(50) NOT NULL/*图片路径*/
);


-- 6.1电脑详情数据

-- 联想
INSERT INTO computer_details
VALUES('1', '1', 'http://127.0.0.1:3000/lxd.jpg');
INSERT INTO computer_details
VALUES('2', '2', 'http://127.0.0.1:3000/lxd.jpg');
INSERT INTO computer_details
VALUES('3', '3', 'http://127.0.0.1:3000/lxd.jpg');
INSERT INTO computer_details
VALUES('4', '4', 'http://127.0.0.1:3000/lxd.jpg');
INSERT INTO computer_details
VALUES('5', '5', 'http://127.0.0.1:3000/lxd.jpg');

-- 惠普
INSERT INTO computer_details
VALUES('6', '6', 'http://127.0.0.1:3000/hpd.jpg');
INSERT INTO computer_details
VALUES('7', '7', 'http://127.0.0.1:3000/hpd.jpg');
INSERT INTO computer_details
VALUES('8', '8', 'http://127.0.0.1:3000/hpd.jpg');
INSERT INTO computer_details
VALUES('9', '9', 'http://127.0.0.1:3000/hpd.jpg');
INSERT INTO computer_details
VALUES('10', '10', 'http://127.0.0.1:3000/hpd.jpg');

-- 华硕
INSERT INTO computer_details
VALUES('11', '11', 'http://127.0.0.1:3000/hsd.jpg');
INSERT INTO computer_details
VALUES('12', '12', 'http://127.0.0.1:3000/hsd.jpg');
INSERT INTO computer_details
VALUES('13', '13', 'http://127.0.0.1:3000/hsd.jpg');
INSERT INTO computer_details
VALUES('14', '14', 'http://127.0.0.1:3000/hsd.jpg');
INSERT INTO computer_details
VALUES('15', '15', 'http://127.0.0.1:3000/hsd.jpg');

-- 苹果
INSERT INTO computer_details
VALUES('16', '16', 'http://127.0.0.1:3000/pgd.jpg');
INSERT INTO computer_details
VALUES('17', '17', 'http://127.0.0.1:3000/pgd.jpg');
INSERT INTO computer_details
VALUES('18', '18', 'http://127.0.0.1:3000/pgd.jpg');
INSERT INTO computer_details
VALUES('19', '19', 'http://127.0.0.1:3000/pgd.jpg');

-- 华为
INSERT INTO computer_details
VALUES('20', '20', 'http://127.0.0.1:3000/hwd.jpg');
INSERT INTO computer_details
VALUES('21', '21', 'http://127.0.0.1:3000/hwd.jpg');
INSERT INTO computer_details
VALUES('22', '22', 'http://127.0.0.1:3000/hwd.jpg');

-- 小米
INSERT INTO computer_details
VALUES('23', '23', 'http://127.0.0.1:3000/xmd.jpg');
INSERT INTO computer_details
VALUES('24', '24', 'http://127.0.0.1:3000/xmd.jpg');
INSERT INTO computer_details
VALUES('25', '25', 'http://127.0.0.1:3000/xmd.jpg');


-- 7.购物车数据表
CREATE TABLE shop_car
(
	car_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,/*不为空 是主键 自增、唯一*/
	computer_id int
(10) NOT NULL,/*不为空  唯一*/
	user_id int
(10) NOT NULL,/*用户id*/
	amount INT
(10) NOT NULL,/*数量*/
	ctype INT
(10) NOT NULL/*ctype--1:电脑--2:配件--3:外设*/
);

-- 7.1购物车数据
INSERT INTO shop_car
VALUES('1', '1', '1', 1, 1);
INSERT INTO shop_car
VALUES('2', '2', '1', 1, 1);


-- 8.地址信息
CREATE TABLE userAddress
(
	add_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,/*不为空 是主键 自增、唯一*/
	user_id int
(10) NOT NULL,/*用户id*/
	userName VARCHAR
(20) NOT NULL,/*数量*/
	addreses VARCHAR
(100) NOT NULL,/*ctype--1:电脑--2:配件--3:外设*/
	phone VARCHAR
(11) NOT NULL,
	email VARCHAR
(30),
	addName VARCHAR
(20),
	isDefault INT
(1)
);

-- 8.1购物车数据
INSERT INTO userAddress
VALUES('1', '1', '海贼王', '云南省昆明市', '18308797998', '678000', '公司', 1);
INSERT INTO userAddress
VALUES('2', '1', '火影忍者', '云南省保山市', '18308797998', '6780000', '家', 0);

-- 9.订单信息
CREATE TABLE orders
(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,/*不为空 是主键 自增、唯一*/
	orders_num VARCHAR
(100),/*用户id*/
	user_id int
(200),/*数量*/
	computer_id VARCHAR
(100),
	total VARCHAR
(100),
	amount VARCHAR
(20),
	order_date VARCHAR
(50),
	pay_date VARCHAR
(50),
	add_id VARCHAR
(50),
	-- 01-未付款-02-待发货-03-已发货-04-待评价-05-完成订单-06-取消订单
	order_type VARCHAR
(10)
);

-- 9.1订单信息数据
INSERT INTO orders
VALUES('1', '2021518222119584', '1', '1', '3800', '1', '2020/5/18', '',  '1', '01');
INSERT INTO orders
VALUES('2', '2021518222119585', '1', '2', '8000', '2', '2020/5/19', '', '1', '01');


-- 10.收藏夹
CREATE TABLE favorites
(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,/*不为空 是主键 自增、唯一*/
	user_id int
(200),/*数量*/
	computer_id VARCHAR
(100)
);

-- 10.1收藏夹数据
INSERT INTO favorites
VALUES('1', '1', '1');

-- 11.评价
CREATE TABLE evaluate
(
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,/*不为空 是主键 自增、唯一*/
	user_id VARCHAR
(200),
	computer_id VARCHAR
(100),
	orders_num VARCHAR
(100),
	rate VARCHAR
(100),
	evaluate_info VARCHAR
(300),
	evaluate_image VARCHAR
(300),
	evaluate_date VARCHAR(100)
);
INSERT INTO evaluate
	VALUES('1', '1', '1', '1', '5', '真棒！', 'http://127.0.0.1:3000/1651046870433.jpg');