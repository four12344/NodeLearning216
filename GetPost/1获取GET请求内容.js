// 获取GET请求内容

var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);


// 在浏览器中访问 http://127.0.0.1:3000/
    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '',
    //     query: {},
    //     pathname: '/',
    //     path: '/',
    //     href: '/' }

// 在浏览器中访问 http://localhost:3000/user?name=菜鸟教程&url=www.runoob.com 
    // Url {
    //     protocol: null,
    //     slashes: null,
    //     auth: null,
    //     host: null,
    //     port: null,
    //     hostname: null,
    //     hash: null,
    //     search: '?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com',
    //     query: { name: '菜鸟教程', url: 'www.runoob.com' },
    //     pathname: '/user',
    //     path: '/user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com',
    //     href: '/user?name=%E8%8F%9C%E9%B8%9F%E6%95%99%E7%A8%8B&url=www.runoob.com' }