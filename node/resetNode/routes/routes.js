module.exports=function(app){
    app.get('/',function (req,res){
        res.render('index',{
        	title:'首页',
        	user: req.session.user
        });
    })
    app.get('/login',function (req,res){
        res.render('login',{
        	title:'登录',
        	user: req.session.user
    	});
    })
    app.get('/reg',function (req,res){
        res.render('reg',{
        	title:'注册',
        	user: req.session.user
    	});
    })
    app.get('/loginout',function(req,res){
    	req.session.user=null;
    	res.redirect('/');
    })
}