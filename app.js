const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog.js");
const handleUserRouter = require("./src/router/user.js");

const getPostData = req => {
    const promise = new Promise((res, rej) => {
        if (req.method !== "POST") {
            res({});
            return;
        }
        if (req.headers["content-type"] !== "application/json") {
            console.log("content")
            console.log(req.headers)
            res({});
            return;
        }
        let postData = "";
        req.on("data", chunk => {
            postData += chunk.toString();
        });
        req.on("end", () => {
            if (!postData) {
                res({});
                return;
            }
            res(JSON.parse(postData));
        })
    });
    return promise;
}
const serverHandle = (req, res) => {
    // 设置返回的数据格式为json
    res.setHeader("Content-type", "application/json");
    const url = req.url;
    const path = url.split("?")[0];
    const query = querystring.parse(url.split("?")[1]);
    req.path = path;
    req.query = query;
    getPostData(req).then(postData => {
        req.body = postData;
        return req.body;
    }).then(() => {
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            return blogResult;
        }
        // 处理user路由
        const userResult = handleUserRouter(req, res);
        if (userResult) {
            return userResult;
        }
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });
        res.write("404 not found");
        res.end();
    }).then(data => {
        if(data) {
            res.end(JSON.stringify(data));
            return;
        }
    })
};

module.exports = serverHandle;