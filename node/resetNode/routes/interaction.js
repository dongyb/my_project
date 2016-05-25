//交互代码
var crypto=require('crypto');//数据处理模块
var User=require('../models/user.js')
module.exports=function(app){
	//注册
	app.post('/user/reg',function (req,res){
		var md5=crypto.createHash('md5');
		var password=md5.update(req.body.password).digest('hex');
		var newUser=new User({
			username:req.body.username,
			password:password
		});
		User.get(newUser.username,function(err,user){
			if(err){
				res.json({
					ret:0,
					msg:err
				})
			}else{
				if(!user){
					newUser.save(function(err){
						if(err){
							res.json({
								ret:0,
								msg:err
							})
						}else{
							res.json({
								ret:1,
								msg:'注册成功'
							})
						}
					})
				}else{
					res.json({
						ret:0,
						msg:'用户名已被注册'
					})
				}
			}
		})
		
	})
	//登录
	app.post('/user/login',function (req,res){

	})
}