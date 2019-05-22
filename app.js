const querystring = require("querystring");
const blogRouter = require("./src/router/blog");
const loginRouter = require("./src/router/login");


const serverHandle = (req, res) => {
    // 设置返回格式 json
    res.setHeader('Content-type','application/json');

    // path 设置
    const url = req.url;
    const path = url.split("?")[0];
    req.path = path;

    // 解析query 
    const query = querystring.parse(url.split("?")[1]);
    req.query = query;

    // 处理路由
    const blog = blogRouter(req, res);
    console.log(blog);
    if(blog) {
        res.end(
            JSON.stringify(blog)
        );
        return;
    }
    const login = loginRouter(req, res);
    if(login) {
        res.end(
            JSON.stringify(login)
        );
        return;
    }
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write("404 not found");
    res.end();
   
}

module.exports = serverHandle;