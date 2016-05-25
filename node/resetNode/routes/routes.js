module.exports=function(app){
    app.get('/',function (req,res){
        res.render('index',{title:'首页'});
    })
    app.get('/login',function (req,res){
        res.render('login',{title:'登录'});
    })
    app.get('/reg',function (req,res){
        res.render('reg',{title:'注册'});
    })
}