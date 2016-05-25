//用户信息
var mongodb=require('./db.js');
var User=function(user){
	this.username=user.username;
	this.password=user.password;
}
module.exports=User;
//储存用户信息
User.prototype.save=function(callback){
	var user={
		username:this.username,
		password:this.password,
	}
	//打开数据库
	mongodb.open(function (err,db){
		if(err){
			return callback(err);
		}
		//读取users集合
		db.collection('users',function (err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(user,{safe:true},function (err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user[0]);
			})
		})
	})
}
//查询用户信息
User.get=function(name,callback){
	mongodb.open(function (err,db){
		if(err){
			return callback(err);
		}
		db.collection('users',function (err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({username:name},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user);
			})
		})
	})
}
