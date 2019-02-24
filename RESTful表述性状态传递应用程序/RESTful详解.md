# RESTful详解

## 一、RESTful是什么？

> RESTful指满足`REST`的`应用程序`（Web Services）或设计。
> 所以需要先了解什么是**REST**。

- **REST**
  - `表述性状态传递`(Representational State Transfer)
  - 是一组`架构约束条件`和`原则`。
  - 是设计风格而不是标准。
  - 通常基于使用的协议和标准：HTTP，URI，和XML以及HTML。
    - 比如HTTP方法：GET获取、PUT更新或添加、DELETE删除、POST添加。
  - 通常使用的数据格式： JSON 。
- **RESTful**
  - 指满足`REST`的`应用程序`（Web Services）或设计。

---

## 二、REST原则

> 结合REST原则，围绕资源展开讨论，从资源的定义、获取、表述、关联、状态变迁等角度，列举一些关键概念并加以解释。

### 1、资源与URI

> 资源是后端接口的地址、URI。

- URI的设计应该遵循可寻址性原则，具有自描述性，需要在形式上给人以直觉上的关联。
- URI设计上的一些技巧：
  - 使用`_`或`-`来让URI`可读性`更好
  - 使用`/`来表示资源的`层级关系`
  - 使用`?`用来`过滤资源`
  - `,`或`;`可以用来表示`同级资源`的关系

### 2、统一资源接口

> 如果按照HTTP方法的语义来暴露资源，那么接口将会拥有安全性和幂等性(无论请求多少次，都不会改变服务器状态，即得到相同的结果值。)的特性。
>> 例如GET、HEAD、PUT和DELETE请求都是安全的。POST是非幂等性且不安全。

#### GET

- 安全且幂等
- 获取表示
- 变更时获取表示（缓存）
- 200（OK） - 表示已在响应中发出
- 204（无内容） - 资源有空表示
- 301（Moved Permanently） - 资源的URI已被更新
- 303（See Other） - 其他（如，负载均衡）
- 304（not modified）- 资源未更改（缓存）
- 400 （bad request）- 指代坏请求（如，参数错误）
- 404 （not found）- 资源不存在
- 406 （not acceptable）- 服务端不支持所需表示
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务端当前无法处理请求

#### POST

- 不安全且不幂等
- 使用服务端管理的（自动产生）的实例号创建资源
- 创建子资源
- 部分更新资源
- 如果没有被修改，则不过更新资源（乐观锁）
- 200（OK）- 如果现有资源已被更改
- 201（created）- 如果新资源被创建
- 202（accepted）- 已接受处理请求但尚未完成（异步处理）
- 301（Moved Permanently）- 资源的URI被更新
- 303（See Other）- 其他（如，负载均衡）
- 400（bad request）- 指代坏请求
- 404 （not found）- 资源不存在
- 406 （not acceptable）- 服务端不支持所需表示
- 409 （conflict）- 通用冲突
- 412 （Precondition Failed）- 前置条件失败（如执行条件更新时的冲突）
- 415 （unsupported media type）- 接受到的表示不受支持
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务当前无法处理请求

#### PUT

- 不安全但幂等
- 用客户端管理的实例号创建一个资源
- 通过替换的方式更新资源
- 如果未被修改，则更新资源（乐观锁）
- 200 （OK）- 如果已存在资源被更改
- 201 （created）- 如果新资源被创建
- 301（Moved Permanently）- 资源的URI已更改
- 303 （See Other）- 其他（如，负载均衡）
- 400 （bad request）- 指代坏请求
- 404 （not found）- 资源不存在
- 406 （not acceptable）- 服务端不支持所需表示
- 409 （conflict）- 通用冲突
- 412 （Precondition Failed）- 前置条件失败（如执行条件更新时的冲突）
- 415 （unsupported media type）- 接受到的表示不受支持
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务当前无法处理请求

#### DELETE

- 不安全但幂等
- 删除资源
- 200 （OK）- 资源已被删除
- 301 （Moved Permanently）- 资源的URI已更改
- 303 （See Other）- 其他，如负载均衡
- 400 （bad request）- 指代坏请求
- 404 （not found）- 资源不存在
- 409 （conflict）- 通用冲突
- 500 （internal server error）- 通用错误响应
- 503 （Service Unavailable）- 服务端当前无法处理请求

#### 常见的问题

> POST和PUT用于创建资源时有什么区别?

- POST和PUT在创建资源的区别在于，所创建的资源的名称(URI)是否由客户端决定。(🤔阿勒？什么鬼...)

> 客户端不一定都支持这些HTTP方法吧?

- 比较古老的基于浏览器的客户端，只能支持GET和POST两种方法。

### 3、资源的表述

> 资源的表述包括`数据`和描述数据的`元数据`(如：Content-Type)。

> 那么客户端如何知道服务端提供哪种表述形式呢?

- 答案是可以通过HTTP内容协商，客户端可以通过Accept头请求一种特定格式的表述，服务端则通过Content-Type告诉客户端资源的表述形式。

### 4、资源的链接

### 5、状态的转移

> 无状态通信原则

- 客户端负责维护应用状态，而服务端维护资源状态。
- 客户端与服务端的交互必须是无状态的。
- 服务端不需要在请求间保留应用状态，只有在接受到实际请求的时候，服务端才会关注应用状态。
