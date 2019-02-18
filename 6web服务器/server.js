var http = require('http');
var fs = require('fs');
var url = require('url');

// 1、创建服务器
// 2、解析请求，包括文件名（✏️请求访问当前项目下面的文件）
// 3、从文件系统中读取请求的文件内容

// 调试：
    // http://127.0.0.1:8888/index.html
    // ⚠️这个路径是相对于 当前node执行的路径

function handleReadFile(err, data, response) {
    if (err) {
        console.log(err);
        response.writeHead(404, {'Content-Type': 'text/html'});
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data.toString());
    }
    response.end();
}

function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname; // 2
    console.log('请求访问当前项目下面的文件:', pathname);

    fs.readFile(pathname.substr(1), (err, data) => {handleReadFile(err, data, response)}); // 3
}

http.createServer(onRequest).listen(8888); // 1

console.log('Server running at http://127.0.0.1:8888/');