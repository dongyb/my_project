//加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var MongoStore=require('connect-mongo')(session);
var settings = require('./settings');
var flash=require('connect-flash');

//加载路由控制
var routes = require('./routes/routes');
var interaction=require('./routes/interaction');

//创建项目实例
var app = express();

// view engine setup 定义ejs模板引擎和模板文件位置 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//flash功能
app.use(flash());
//ico图标
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//日志
app.use(logger('dev'));
//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//定义cookie解析器
app.use(cookieParser());
//定义静态文件位置
app.use(express.static(path.join(__dirname, 'public')));
//数据库
app.use(session({
    secret:settings.cookieSecret,
    key:settings.db,
    cookie:{maxAge:1000*60*60*24*30},
    store:new MongoStore({
      url:'mongodb://localhost/blog'
    })
}))


//匹配路由与路径
routes(app);
interaction(app);

// 404 错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//500错误
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//监听8080端口
app.listen(8080);
//输出模型app
module.exports = app;
