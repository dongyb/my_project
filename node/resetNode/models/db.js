var settings=require('../settings.js');
var mongodb=require('mongodb'),
	Db=mongodb.Db,
	Connection=mongodb.Connection,
	Server=mongodb.Server;
module.exports=new Db(settings.db,new Server(settings.host,settings.port),{safe:true});
