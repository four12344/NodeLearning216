var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});  // 第二个参数为回调函数 

console.log("程序执行结束!");

// 异步 按顺序执行 数据结果如下：
// 程序执行结束!
// wwww.wwww