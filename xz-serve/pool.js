//引入mysql
const mysql = require('mysql');
//创建连接池对象
const pool = mysql.createPool({
	//MySQL数据库服务器的地址
	host:'127.0.0.1',
	//端口号
	port:3306,
	//数据库用户的用户名
	user:'root',
	//数据库用户的密码
	password:'',
	//数据库名称
	database:'xz_shop',
	//最大连接数据
	connectionLimit:10
  });
//导出连接池对象
module.exports=pool;