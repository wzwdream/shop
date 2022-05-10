//引入express
const express=require('express');

//引入连接池模块
const pool=require('../pool.js');

//创建路由器对象r
const r=express.Router();
// 导入上传文件中间件
const multer = require('multer')
//图片上传
var stroage = multer.diskStorage({
    //设置上传的文件夹
    destination: function (req, file, cd) {
        cd(null, 'uploads')
    },
    filename: function (req, file, cb) {
        //设置图片的名称
        cb(null, `${Date.now()}.${file.originalname.split('.')[1]}`)
    }
})
const upload = multer({ storage: stroage })
const async = require('async');
// 查询电脑品牌接口
r.get('/computers',(req,res)=>{
    let sql = 'select * from computers';
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});


// 查询配件品牌数据接口
r.get('/parts',(req,res)=>{
    let sql = 'select * from parts';
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});


// 查询外设品牌数据接口
r.get('/peripheral',(req,res)=>{
    let sql = 'select * from peripheral';
    pool.query(sql,(err,results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});


// 查询电脑数据接口
r.post('/computer',(req,res)=>{
    let name = req.body.name;
    let sql = `SELECT * FROM xz_computer WHERE computer_name LIKE "%${name}%" OR classification LIKE "%${name}%" OR cpu LIKE "%${name}%" OR color LIKE "%${name}%"`;
    pool.query(sql, (err,results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});


// 查询电脑数据接口
r.post('/computer_id',(req,res)=>{
    let computer_id = req.body.computer_id;
    let sql = 'select * from xz_computer where computer_id = ?';
    pool.query(sql, [computer_id], (err,results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});


// 分页查询电脑数据接口
r.post('/computer_limit',(req,res)=>{
    let name = req.body.name;
    let begin = req.body.begin;
    let end = req.body.end;
    let sql = 'select * from xz_computer where computer_name like' + '"%' + name + '%" limit ' + begin + ',' +  end;
    pool.query(sql, (err,results)=>{
        if(err) throw err;
        let sql1 = 'select count(*) as pageTotal from xz_computer'
        pool.query(sql1, (err,total)=>{
            res.send({message:results,code:1, pageTotal: total[0].pageTotal});
        })
    });
});
// 删除商品数据
r.post('/deleteComputer',(req,res)=>{
    let computer_id = req.body.computer_id;
    let sql = `DELETE FROM xz_computer WHERE computer_id=?`;
    pool.query(sql,[computer_id], (err,results)=>{
        if(err) throw err
        let sql1 = `DELETE FROM computer_details WHERE computer_id=?`
        pool.query(sql1,[computer_id], (err,result)=>{
            if(err) throw err
            res.send({message:result,code:1});
        })
    });
});
// 分页查询电脑数据接口
r.post('/computerAll',(req,res)=>{
    let begin = req.body.begin;
    let end = req.body.end;
    let sql = 'select * from xz_computer limit ' + begin + ',' +  end;
    pool.query(sql, (err,results)=>{
        if(err) throw err;
        let sql1 = 'select count(*) as pageTotal from xz_computer'
        pool.query(sql1, (err,total)=>{
            res.send({message:results,code:1, pageTotal: total[0].pageTotal});
        })
    });
});
// 电脑详情数据接口
r.post('/computer_details',(req,res)=>{
    let name = req.body.name;
    let sql = 'select * from computer_details where computer_id = ?';
    pool.query(sql, [name], (err,results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});
// 修改电脑数据接口
r.post('/modifyComputer',(req,res)=>{
    const { computer_name, computer_family, price, cpu, graphicsSize, color, memory, size, resolving_power,graphicsType,computer_system,classification, hard_disk, computers_img, computer_id, detailsImg} = req.body
    let sql = 'UPDATE `xz_computer` SET `computer_name`=?,`computer_family`=?,`price`=?,`cpu`=?,`graphicsSize`=?,`color`=?,`memory`=?,`size`=?,`resolving_power`=?,`graphicsType`=?,`computer_system`=?,`classification`=?,`hard_disk`=?,`computers_img`=? WHERE computer_id=?';
    pool.query(sql, [computer_name, computer_family, price, cpu, graphicsSize, color, memory, size, resolving_power,graphicsType,computer_system,classification, hard_disk, computers_img, computer_id], (err,results)=>{
        if(err) throw err;
        let sql2 = 'UPDATE `computer_details`set `details_img` = ? WHERE computer_id=?'
        pool.query(sql2, [detailsImg, computer_id], (err, resul) => {
            if(err) throw err
            res.send({message:results,code:1});
        })
    });
});
// 新增电脑数据接口
r.post('/addComputer',(req,res)=>{
    const { computer_name, computer_family, price, cpu, graphicsSize, color, memory, size, resolving_power,graphicsType,computer_system,classification, hard_disk, computers_img, detailsImg} = req.body
    let sql = `INSERT INTO xz_computer(computer_id, computer_name, computer_family, price, cpu, graphicsSize, color, memory, size, resolving_power, graphicsType, computer_system, classification, hard_disk, computers_img, ctype) VALUES ('',?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)`
    pool.query(sql, [computer_name, computer_family, price, cpu, graphicsSize, color, memory, size, resolving_power, graphicsType, computer_system, classification, hard_disk, computers_img], (err,results)=>{
        if(err) throw err;
        let sql1 = `SELECT max(computer_id) as computer_id FROM xz_computer`
        pool.query(sql1, (err, resl) => {
            if(err) throw err
            console.log(resl,'====')
            let computer_id = resl[0].computer_id
            let sql2 = 'INSERT INTO `computer_details`(`details_id`, `computer_id`, `details_img`) VALUES ("",?,?)'
            pool.query(sql2, [computer_id,detailsImg], (err, resul) => {
                if(err) throw err
                res.send({message:results,code:1});
            })
        })
    });
});
// 查询购物车数据接口
r.post('/shop_car',(req,res)=>{
    let user_id = req.body.user_id;
    let sql = 'select * from shop_car where user_id = ?';
    pool.query(sql, [user_id], (err,results)=>{
        if(err) throw err;
        const data = results
        if (typeof results !== 'object') data = [data]
        let sql = 'select * from xz_computer where computer_id = ?'
        async.map(results,
            function(item, callBack) {
                pool.query(sql,[item.computer_id], async (error,res)=>{
                    if(error) throw error
                    item = {...res[0], ...item}
                    callBack(null, item)
                })
            },
            function(err, result) {
                res.send({message:result,code:1});
            }
        )
        // res.send({message:results,code:1});
    });
});


// 加入购物车数据接口
r.post('/addShop_car',(req,res)=>{
    let cid = req.body.cid;
    let ctype = req.body.ctype;
    let amount = req.body.amount;
    let u_id = req.body.u_id;
    let sql = 'select * from shop_car where computer_id = ? AND ctype = ?';
    pool.query(sql, [cid, ctype], (err, resu)=>{
        if(err) throw err;
        console.log(resu);
        if (resu.length > 0) {
            res.send({message: '', code: 0});
        } else {
        let sql = 'insert into shop_car (car_id, computer_id, user_id, ctype, amount) values ("", ?,?,?,?)';
        pool.query(sql, [cid, u_id, ctype, amount], (err,results)=>{
            if(err) throw err;
            // console.log('插入数据', results);
            res.send({message:results,code:1});
        });
        }
    });
});

// 删除购物车接口
r.post('/deleteShop', (req, res) => {
    let cid = req.body.cid;
    let sql = 'delete from shop_car where car_id = ?';
    pool.query(sql, [cid], (err, results) => {
        if (err) throw err;
        if (results.affectedRows) {
            res.send({code: 1});
        } else {
            res.send({code: 0});
        }
    })
});

//查询收获地址接口
r.post('/address', (req, res) => {
    let user_id = req.body.user_id;
    let sql = 'select * from userAddress where user_id = ?';
    pool.query(sql, [user_id], (err, results) => {
        if (err) throw err;
        res.send({message: results, code: 1});
    })
});

//根据地址id查询收获地址接口
r.get('/getAddress', (req, res) => {
    let add_id = req.query.add_id;
    let sql = 'select * from userAddress where add_id = ?';
    pool.query(sql, [add_id], (err, results) => {
        if (err) throw err;
        res.send({message: results, code: 1});
    })
});

//添加收获地址接口
r.post('/addAddress', (req, res) => {
    let user_id = req.body.user_id;
	let userName = req.body.userName;
	let addreses = req.body.addreses;
	let phone = req.body.phone;
	let email = req.body.email;
	let addName = req.body.addName;
    let sql = 'insert into userAddress (add_id, user_id, userName, addreses, phone, email, addName, isDefault) values ("",?,?,?,?,?,?,0)';
    pool.query(sql, [user_id, userName, addreses, phone, email, addName], (err, results) => {
        if (err) throw err;
        res.send({message:results,code:1});
    })
});
//编辑收获地址接口
r.post('/modifyAddress', (req, res) => {
    const { add_id, user_id, userName, addreses, phone, email, addName } = req.body;
    let sql = 'UPDATE `useraddress` SET `user_id`=?,`userName`=?,`addreses`=?,`phone`=?,`email`=?,`addName`=? WHERE add_id=?';
    pool.query(sql, [user_id, userName, addreses, phone, email, addName, add_id], (err, results) => {
        if (err) throw err;
        res.send({message:results,code:1});
    })
});
//删除收获地址接口
r.post('/deleteAddress', (req, res) => {
    let add_id = req.body.add_id;
    let sql = 'DELETE FROM `useraddress` WHERE add_id = ?';
    pool.query(sql, [add_id], (err, results) => {
        if (err) throw err;
        res.send({message:results,code:1});
    })
});
//设置为默认地址
r.post('/setAddressDefault', (req, res) => {
    let add_id = req.body.add_id;
    let sql = 'SELECT * FROM `useraddress` WHERE `isDefault`= 1'
    pool.query(sql, (err, results) => {
        if(results[0].add_id) {
            let sql = 'UPDATE `useraddress` SET `isDefault`= 0 WHERE `add_id`= ?';
            pool.query(sql, [results[0].add_id], (err, result) => {
                let sql = 'UPDATE `useraddress` SET `isDefault`= 1 WHERE `add_id`= ?';
                pool.query(sql, [add_id], (err, resul) => {
                    if (err) throw err;
                    res.send({message:resul,code:1});
                })    
            })
        } else {
            let sql = 'UPDATE `useraddress` SET `isDefault`= 1 WHERE `add_id`= ?';
            pool.query(sql, [add_id], (err, resul) => {
                if (err) throw err;
                res.send({message:resul,code:1});
            })
        }
    })
});

//添加订单接口
r.post('/addOrder', (req, res) => {
    let orders_num = req.body.orders_num;
    let user_id = req.body.user_id;
	let computer_id = req.body.computer_id;
	let total = req.body.total;
	let amount = req.body.amount;
	let order_date = req.body.order_date;
    let order_type = req.body.order_type
    let sql = 'insert into orders (id, orders_num, user_id, computer_id, total, amount, order_date, pay_date, order_type) values ("",?,?,?,?,?,?,"0",?)';
    pool.query(sql, [orders_num, user_id, computer_id, total, amount, order_date, order_type], (err, results) => {
        if (err) throw err;
        res.send({message:results,code:1});
    })
});

//修改订单状态接口
r.post('/opdateOrderStatus', (req, res) => {
    let orders_num = req.body.orders_num;
	let computer_id = req.body.computer_id;
	let total = req.body.total;
    let order_type = req.body.order_type
    let pay_date = req.body.pay_date
    let add_id = req.body.add_id
    let sql = 'update orders set total = ? , order_type = ?, pay_date = ?, add_id = ? where orders_num = ? && computer_id = ?';
    pool.query(sql, [total, order_type, pay_date, add_id, orders_num, computer_id], (err, results) => {
        if (err) throw err;
        res.send({message:results,code:1});
    })
});

// 查询当前用户下所有订单接口
r.post('/getOrderAll',(req,res)=>{
    let user_id = req.body.user_id
    let order_type = req.body.order_type
    let begin = req.body.begin
    let end = req.body.end
    let sql = 'select * from orders where user_id = ? && order_type = ?';
    if (order_type === '00') {
        sql = 'select * from orders where user_id = ?'
    }
    if(order_type === 'all') {
        sql = `select * from orders limit ?, ?`
        let sql1 = `select COUNT(*) as pageTotal from orders`
        pool.query(sql1, (err, total) => {
            pool.query(sql,[ begin, end], (err,results)=>{
                if(err) throw err;
                let sql = 'select * from xz_computer where computer_id = ?'
                async.map(results,
                    function(item, callBack) {
                        pool.query(sql,[item.computer_id], async (error,res)=>{
                            if(error) throw error
                            item = {...res[0], ...item}
                            callBack(null, item)
                        })
                    },
                    function(err, result) {
                        res.send({message: result,code:1,pageTotal: total[0].pageTotal});
                    }
                )
            });
        })
    } else {
        pool.query(sql,[user_id, order_type, begin, end], (err,results)=>{
            if(err) throw err;
            let sql = 'select * from xz_computer where computer_id = ?'
            async.map(results,
                function(item, callBack) {
                    pool.query(sql,[item.computer_id], async (error,res)=>{
                        if(error) throw error
                        item = {...res[0], ...item}
                        callBack(null, item)
                    })
                },
                function(err, result) {
                    res.send({message:result,code:1});
                }
            )
        });
    }
});

// 根据订单号查询订单
r.get('/getOrder',(req,res)=>{
    let orders_num = req.query.orders_num
    let sql = 'select * from orders where orders_num = ?';
    pool.query(sql,[orders_num], (err,results)=>{
        if(err) throw err;
        const data = results
        if (typeof results !== 'object') data = [data]
        let sql = 'select * from xz_computer where computer_id = ?'
        async.map(results,
            function(item, callBack) {
                pool.query(sql,[item.computer_id], async (error,res)=>{
                    if(error) throw error
                    item = {...res[0], ...item}
                    callBack(null, item)
                })
            },
            function(err, result) {
                res.send({message:result,code:1});
            }
        )
    });
});
// 查询待发货跟待付款的订单
r.get('/getAllOrder',(req,res)=>{
    let sql = `SELECT * FROM orders WHERE order_type="01" OR order_type="02"`
    pool.query(sql, (err,results)=>{
        if(err) throw err;
        const data = results
        let sql = 'select * from xz_computer where computer_id = ?'
        async.map(results,
            function(item, callBack) {
                pool.query(sql,[item.computer_id], async (error,res)=>{
                    if(error) throw error
                    item = {...res[0], ...item}
                    callBack(null, item)
                })
            },
            function(err, result) {
                res.send({message:result,code:1});
            }
        )
    });
});
// 查询收藏夹数据
r.get('/favorites',(req,res)=>{
    let user_id = req.query.user_id
    let sql = 'select * from favorites where user_id = ?';
    pool.query(sql,[user_id], (err,results)=>{
        if(err) throw err;
        const data = results
        if (typeof results !== 'object') data = [data]
        let sql = 'select * from xz_computer where computer_id = ?'
        async.map(results,
            function(item, callBack) {
                pool.query(sql,[item.computer_id], async (error,res)=>{
                    if(error) throw error
                    item = {...res[0], ...item}
                    callBack(null, item)
                })
            },
            function(err, result) {
                res.send({message:result,code:1});
            }
        )
    });
});

//新增收藏接口
r.post('/addFavorites', (req, res) => {
    let user_id = req.body.user_id;
	let computer_id = req.body.computer_id;

    let sql = 'select * from favorites where computer_id = ? AND user_id = ?';
    pool.query(sql, [computer_id, user_id], (err, resu)=>{
        if(err) throw err;
        if (resu.length > 0) {
            res.send({message: '', code: 0});
        } else {
            let sql = 'INSERT INTO `favorites`(`id`, `user_id`, `computer_id`) VALUES ("",?,?)';
            pool.query(sql, [user_id, computer_id], (err, results) => {
                if (err) throw err;
                res.send({message:results,code:1});
            })
        }
    });

});
// 删除收藏接口
r.post('/deleteFavorites', (req, res) => {
    let id = req.body.id;
    let sql = 'delete from favorites where id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) throw err;
        if (results.affectedRows) {
            res.send({code: 1});
        } else {
            res.send({code: 0});
        }
    })
});

//上传头像
r.post('/uploadAvatar', upload.single('icon'), (req, res) => {
    const { file, body } = req
    if (!file) return res.send({message: '上传失败'})
    let sql = 'UPDATE xz_user SET user_avartar=? WHERE user_id=?'
    pool.query(sql, [`http://127.0.0.1:3000/${file.filename}`, body.user_id], (err, results) => {
        res.send({message: '修改成功'})
    })
})
//上传图片
r.post('/uploadImage', upload.single('icon'), (req, res) => {
    const { file, body } = req
    if (!file) return res.send({message: '上传失败'})
    res.send({message: '上传成功', img: `http://127.0.0.1:3000/${file.filename}`})
})
//新增评价接口
r.post('/addEvaluate', (req, res) => {
    const { user_id, computer_id,orders_num,rate,evaluate_info,evaluate_image, evaluate_date } = req.body
    let sql = 'INSERT INTO `evaluate`(`id`, `user_id`, `computer_id`, `orders_num`, `rate`, `evaluate_info`, `evaluate_image`, evaluate_date) VALUES ("",?,?,?,?,?,?,?)';
    pool.query(sql, [user_id, computer_id,orders_num,rate,evaluate_info,evaluate_image,evaluate_date], (err, resu)=>{
        if(err) throw err;
        let sql = 'update orders set order_type = "05" where orders_num = ? && computer_id = ?';
        pool.query(sql, [orders_num, computer_id], (err, results) => {
            if (err) throw err;
            res.send({message:results,code:1});
        })
    });
});
//删除评价接口
r.post('/deleteEvaluate', (req, res) => {
    const { id } = req.body
    let sql = 'DELETE FROM `evaluate` WHERE id=?';
    pool.query(sql, [id], (err, results)=>{
        if(err) throw err;
        res.send({message:results,code:1});
    });
});
//查询评价
r.post('/getEvaluate', (req, res) => {
    const { computer_id } = req.body
    let sql = 'select d.*, e.* from evaluate d,xz_computer e where d.computer_id = ? AND e.computer_id=d.computer_id;';
    pool.query(sql, [computer_id], (err, result)=>{
        if(err) throw err;
        let sql2 = `SELECT * FROM xz_user WHERE user_id=?`
        async.map(result,
            function(ele, callBack) {
                pool.query(sql2,[ele.user_id], async (error,res)=>{
                    if(error) throw error
                    ele = {...res[0], ...ele}
                    callBack(null, ele)
                })
            },
            function(err, resul) {
                res.send({message:resul,code:1});
            }
        )
    });
});
//查询全部评价
r.post('/getEvaluateAll', (req, res) => {
    let begin = req.body.begin
    let end = req.body.end
    let sql = 'select d.*, e.* from evaluate d,xz_computer e where e.computer_id=d.computer_id LIMIT ?,?;';
    let sql1 = `SELECT COUNT(*) as pageTotal FROM evaluate`
    pool.query(sql1, (err, total) => {
        if(err) throw err
        pool.query(sql, [begin, end], (err, result)=>{
            if(err) throw err;
            let sql2 = `SELECT * FROM xz_user WHERE user_id=?`
            async.map(result,
                function(ele, callBack) {
                    pool.query(sql2,[ele.user_id], async (error,res)=>{
                        if(error) throw error
                        ele = {...res[0], ...ele}
                        callBack(null, ele)
                    })
                },
                function(err, resul) {
                    res.send({message:resul,code:1, pageTotal: total[0].pageTotal});
                }
            )
        });
    })
});
//导出路由器对象
module.exports=r;
