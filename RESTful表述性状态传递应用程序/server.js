var express = require('express');
var app = express();
var fs = require("fs");
var serverUrl = '';

// 0、路由
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    res.write('serverUrl:' + serverUrl);
    res.write('<br/><br/>listUsers，用于读取用户的信息列表: <a href="' + serverUrl + '/listUsers">🔗</a>');
    res.write('<br/>addUser， 用于添加新的用户数据: <a href="' + serverUrl + '/addUser">🔗</a>');
    res.write('<br/>:id（用户id）， 用于读取指定用户1的详细信息: <a href="' + serverUrl + '/1">🔗</a>');
    res.write('<br/>deleteUser， 用于删除指定用户2的详细信息: <a href="' + serverUrl + '/deleteUser">🔗</a>');
    res.end();
})

// 1、创建了 RESTful API listUsers，用于读取用户的信息列表
app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

// 2、创建了 RESTful API addUser， 用于添加新的用户数据
// ⚠️ users.json文件内的数据没有改变
//添加的新用户数据
var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
};
app.get('/addUser', function (req, res) {
    // 读取已存在的数据
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data, null, 4));
    });
})

// 4、创建了 RESTful API deleteUser， 用于删除指定用户2的详细信息
app.get('/deleteUser', function (req, res) {

    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["user" + 2];

        console.log(data);
        res.end(JSON.stringify(data, null, 4));
    });
})

// 3、创建了 RESTful API :id（用户id）， 用于读取指定用户的详细信息
// ⚠️ 如果在同一个 server.js 里创建多个 RESTful API ， 并且 :id 放在前边， 那么它会拦截其他的请求（所以3写在最后）
app.get('/:id', function (req, res) {
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var user = data["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user, null, 4));
    });
})

var server = app.listen(8081, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;
    serverUrl = 'http://' + host + ':' + port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})