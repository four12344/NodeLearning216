// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序          -> 3
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件        -> 4
   eventEmitter.emit('data_received');
}
 
// 使用匿名函数绑定 data_received 事件    -> 5
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 绑定 connection 事件处理程序       -> 2
eventEmitter.on('connection', connectHandler);

// 触发 connection 事件               -> 1
eventEmitter.emit('connection');

console.log("程序执行完毕。"); //     -> 6

// 执行结果：
// 连接成功
// 数据接收成功
// 程序执行完毕