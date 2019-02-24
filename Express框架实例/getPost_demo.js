var express = require('express');
var app = express();
// 文件处理的包
var fs = require("fs");

// ✏️ 这个是什么？
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// ✏️ 这个是什么？
var multer = require('multer');
app.use(multer({ dest: '/tmp/'}).array('image'));
// ⚠️ 上传的文件的 "path":"/tmp/80bc542cac76fe442a9b7647384c2aa7"

// ✏️ 这个是什么？
var cookieParser = require('cookie-parser');
app.use(cookieParser())

// ✏️ 这个是什么？
var util = require('util');

// 0、表单请求，查看Cookies
app.get('/index.htm', function (req, res) {
    console.log('__dirname:', __dirname);
    console.log("Cookies: " + util.inspect(req.cookies));
    // __dirname: /Users/lijing/Desktop/NodeLearning216/Express框架实例
    res.sendFile(__dirname + "/" + "index.htm");
})

// 1、get表单跳转到这个路由
app.get('/process_get', function (req, res) {

    // ⚠️ charset=utf-8 解决乱码问题
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // ✏️ req.query：获取URL的查询参数串
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    console.log('log ———————————— \n get表单跳转到这个路由，获取到的参数：\n', response);
    res.end(JSON.stringify(response));
})

// 2、post表单跳转到这个路由
app.post('/process_post', urlencodedParser, function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // ✏️ req.body ：获得「请求主体」
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log('log ———————————— \n post表单跳转到这个路由，获取到的参数：\n', response);
    res.end(JSON.stringify(response));
})

// 3、updata表单跳转到这个路由
app.post('/file_upload', function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    var des_file = __dirname + "/upload/" + req.files[0].originalname; // 图片上传到哪一个文件
    fs.readFile(req.files[0].path, function (err, data) {
        // ⚠️ des_file 这里将上传路径必须存在，即不会自动创建文件夹upload
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                response = {
                    message: 'File uploaded failed',
                    err: err,
                    getFile: req.files[0]
                };
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname,
                    getFile: req.files[0]
                };
            }
            console.log('log ———————————— \n updata表单跳转到这个路由，获取到的参数：\n', response);
            res.end(JSON.stringify(response, null, 4));
        });
    });
})

var server = app.listen(8081, 'localhost', function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})