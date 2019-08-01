### node.js project 
#### nvm 本地管理多版本的node.js
#### server端和前端的区别
1. 服务稳定性
2. 内存和CPU(优化，扩展)
3. 分日志记录
4. 安全
5. 集群和服务拆分  
#### 博客项目
1. 目标：开发一个博客系统，具有博客的基本功能
2. 需求：首页，作者主页，博客详情页，登录页，管理中心，新建页面，编辑页面
3. 技术方案
    (1)数据存储: 博客，用户
    (2)接口设计
#### 接口开发
1. http请求：
    1. DNS解析，建立TCP连接，发送HTTP请求
    2. server接收到http请求，处理并返回
    3. 客户端接收到返回的数据，处理数据
2. nodejs处理http请求：
    1. get请求和querystring
    2. post请求和postData
    3. 路由
3. 搭建开发环境
   1. 使用nodemon监测文件变化，自动重启node
   2. 使用cross-env设置环境变量
4. 开发接口
   1. 初始化路由
   2. 返回假的数据：将路由和数据处理分离，以符合设计原则
#### 数据库
1. mysql
2. node.js连接mysql
3. workbench: mysql 客户端
4. Nodejs操作Mysql
#### 登录
1. 核心：登录验证&登录信息存储
2. cookie和session
3. session写入redis
4. 开发登录功能，和前端联调(nginx反向代理)
##### cookie
1. 什么是cookie：
    (1) 存储在浏览器的一段字符串(最大5kb)
    (2) 跨域不共享
    (3) 格式：k1=v1;k2=v2;k3=v3;
    (4) 每次发送http请求的时候，会将请求域的cookie一起发送给server
    (5) server端可以修改cookie并返回浏览器
    (6) 浏览器中也可以通过js来修改cookie（但是有限制）
2. 客户端js操作COOKIE
    (1) 客户端查看cookie, 有三种方式  
        a. document.cookie  
        b. 浏览器中的application查看  
        c. 每次请求都会发送cookie  
    (2) javascript查看，修改cookie(有限制):               document.cookie来查看和设置
3. server端 nodejs操作cookie
   1. 查看cookie
   2. 修改cookie
   3. 实现登录验证
##### session
1. cookie的问题：会暴露username(等其他信息)，很危险
2. 如何解决：cookie中存储userId, server端对应username
3. session的问题：
    1. 目前session直接是js变量，放在node.js进程内存中
    2. 进程内存是有限的，访问量过大，内存暴增
    3. 正式线上运行是多进程的，进程之间内存无法共享
4. redis: web server最常用的缓存数据库，数据存放在内存中
    1. 访问速度快
    2. 成本高，可存储的数量更小(内存的硬伤)
5. 为何session 适合redis?
    1. session访问频繁，对性能要求极高
    2. session可不考虑断电丢失的问题(内存的硬伤)
    3. session数据量不会很大(相对于mysql)
6. 为何网站数据不适合redis?
    1. 操作频率不是太高
    2. 断电不能丢失，必须保留
    3. 数据量太大，内存成本高
##### redis
1. 安装：
    1. Mac 使用brew install redis
    2. windows 
2. redis使用
    1. windows下进入redis目录：（F:\tools\Redis-x64-3.0.504）
    <code>redis-server.exe redis.windows.conf</code>
    2. 切换到另外一个cmd窗口，上一个不要关闭，执行:
    <code>redis-cli.exe -h 127.0.0.1 -p 6379</code>
##### 和前端联调
1. 登录功能依赖cookie, 必须用浏览器来联调
2. cookie 跨域不共享，前端和server必须同域
3. 需要使用nginx代理，让前后端同域
##### nginx
1. 高性能的web服务器，开源免费
2. 一般用于做静态服务，负载均衡
3. 反向代理
4. 下载：
    1. windows：官网
    2. mac: brew install nginx
5. nginx配置：
    1. Windows: C:/nginx/conf/nginx.conf
    2. Mac: /usr/local/etc/nginx/nginx.conf
6. 命令：
    1. 启动: F:\download\nginx-1.14.1\nginx-1.14.1>start nginx
    2. 关闭: 
        1. nginx -s stop(快速停止nginx)  
        2. nginx -s quit(完整有序的停止nginx)
### 日志
1. 系统没有日志，就等于没有眼睛
2. 访问日志
3. 自定义日志(包括自定义事件，错误记录等)
4. 目录：
    1.nodejs文件操作，nodejs stream
    2.日志功能开发和使用
    3.日志文件拆分，日志内容分析
    4.日志要存储到文件中
#### IO操作的性能瓶颈
1. IO包含"网络IO"和"文件IO"
2. 相比于CPU计算和内存读写，IO特点是：慢
3. stream: source -> dest
