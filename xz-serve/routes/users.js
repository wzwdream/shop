//引入express
const express=require('express');
const { query } = require('../pool.js');

//引入连接池模块
const pool=require('../pool.js');

//创建路由器对象r
const r=express.Router();

// 用户登录
r.post('/login',(req,res)=>{
  let username=req.body.username;
  let pwd=req.body.password;
  let type=req.body.type;
  let sql = 'select * from xz_user where username = ? and password = ? and type = ?';
  pool.query(sql, [username, pwd, type], (err,results)=>{
      if(err) throw err;
      if (results.length > 0) {
        res.send({message:'登录成功',code:1,userInfo: results[0]});
      } else {
        res.send({message:'登录失败',code:0});
      }
  });
});
// 获取用户信息
r.post('/getUSer',(req,res)=>{
  let user_id=req.body.user_id;
  let sql = 'SELECT * FROM `xz_user` WHERE user_id=?'
  pool.query(sql, [user_id], (err,results)=>{
      if(err) throw err;
      res.send({message:results[0],code:0});
  });
});
// 获取用户信息
r.post('/getUSerAll',(req,res)=>{
  let begin = req.body.begin
  let end = req.body.end
  let sql1 = `select COUNT(*) as pageTotal from xz_user`
  pool.query(sql1, (err, total) => {
    let sql = 'SELECT * FROM `xz_user` limit ?, ?'
    pool.query(sql, [begin, end], (err,results)=>{
        if(err) throw err;
        res.send({message:results,code:0,pageTotal: total[0].pageTotal});
    });
  })
});
// 修改用户信息
r.post('/modifyUser',(req,res)=>{
  let username=req.body.username;
  let user_id=req.body.user_id;
  let email=req.body.email;
  let phone=req.body.phone;
  let sql = 'UPDATE xz_user SET username=?,phone=?,email=? WHERE user_id=?'
  pool.query(sql, [username, phone, email, user_id], (err,results)=>{
      if(err) throw err;
      res.send({message:results,code:0});
  });
});
// 修改用户信息
r.post('/modifyUserAll',(req,res)=>{
  let username=req.body.username;
  let user_id=req.body.user_id;
  let email=req.body.email;
  let phone=req.body.phone;
  let password=req.body.password;
  let sql = 'UPDATE xz_user SET username=?,phone=?,email=?,password=? WHERE user_id=?'
  pool.query(sql, [username, phone, email, password, user_id], (err,results)=>{
      if(err) throw err;
      res.send({message:results,code:0});
  });
});
// 删除用户信息
r.post('/deleteUser',(req,res)=>{
  let user_id=req.body.user_id;
  let sql = 'DELETE FROM `xz_user` WHERE user_id=?'
  pool.query(sql, [user_id], (err,results)=>{
      if(err) throw err;
      res.send({message:results,code:0});
  });
});
// 修改密码
r.post('/updatePwd',(req,res)=>{
  let pwd=req.body.password;
  let user_id=req.body.user_id;
  let newPwd=req.body.newPassword;
  let sql = 'SELECT * FROM `xz_user` WHERE user_id=?'
  pool.query(sql, [user_id], (err,results)=>{
      if(err) throw err;
      if(results[0].password === pwd) {
        let sql = 'UPDATE xz_user SET password=? WHERE user_id=?'
        pool.query(sql, [newPwd, user_id], (err,result)=>{
          if(err) throw err;
          res.send({message:'修改成功', code: 0})
        })
      } else {
        res.send({message:'原密码错误',code:1});
      }
  });
});
// 用户注册
r.post('/register',(req,res)=>{
  let username=req.body.reUserName;
  let pwd=req.body.reUserPwd;
  let email=req.body.reUserEmail;
  let phone=req.body.reUserPhone;
  let sql = 'select username from xz_user where username = ?';
  pool.query(sql, [username], (ree, results) => {
    if (results.length > 0) {
      res.send({message: '该用户名已经被注册', code: 0});
    } else {
      sql = 'select email from xz_user where email = ?';
      pool.query(sql,[email],(err,results)=>{
        if(err) throw err;
        if (results.length > 0) {
          res.send({message:'该邮箱已经被注册',code:0});
        } else {
          sql = 'select phone from xz_user where phone = ?';
          pool.query(sql,[phone],(err,results)=>{
            if(err) throw err;
            if (results.length > 0) {
              res.send({message:'该手机号已经被注册',code:0});
            } else {
              sql = 'INSERT INTO xz_user(username, phone, password, email, user_avartar, type) VALUES (?, ?, ?, ?, "http://127.0.0.1:3000/user50.png", "01")';
              pool.query(sql,[username, phone, pwd, email],(err,results)=>{
                  if(err) throw err;
                  console.log(results);
                  res.send({message:'注册成功',code:1});
              });    
            }
          });
        }
      });    
    }
  });
});

//导出路由器对象
module.exports=r;
