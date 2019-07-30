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