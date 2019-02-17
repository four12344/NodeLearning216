var server = require("./server");
var router = require("./router");
 
server.start(router.route);

// 第一步：执行 node index.js
    // Server has started.

// 第二步： 在浏览器中打开127.0.0.1:8888
    // Request for / received.
    // About to route a request for /
    // Request for /favicon.ico received.
    // About to route a request for /favicon.ico