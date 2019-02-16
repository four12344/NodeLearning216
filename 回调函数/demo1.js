var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("程序执行结束!");  

// 同步 按顺序执行 数据结果如下：
// wwww.wwww
// 程序执行结束!