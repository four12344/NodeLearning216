var express = require('express');
var app = express();

// ✏️使用 express.static 中间件来设置静态文件路径
// ⚠️ 这里你在路径：NodeLearning216下执行会读取static文件，即 node Express框架实例/public静态资源_demo.js ❌失败
//      需要在路径：Express框架实例下，才能够读取到static文件，即 node public静态资源_demo.js ✅成功
app.use(express.static('./static'));

app.get('/', function (req, res) {
    res.send('Hello World');
});

var server = app.listen(8081, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

})

// 调试
//      在浏览器中访问 http://127.0.0.1:8081/images/logo.png
// 结构
//      看到图片