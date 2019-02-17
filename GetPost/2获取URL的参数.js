var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    // 这里加上; charset=utf-8（解决乱码问题）
    // 加上之后需要重新node编译改js文件
 
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("url的参数-网站名：" + params.name);
    res.write("\n");
    res.write("url的参数-网站 URL：" + params.url);
    res.end();
 
}).listen(3000);

// http://127.0.0.1:3000/user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com
    // url的参数-网站名：菜鸟教程
    // url的参数-网站 URL：www.runoob.com