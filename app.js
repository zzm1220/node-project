const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog.js");
const handleUserRouter = require("./src/router/user.js");
const { get, set } = require("./src/db/redis.js");

const _expiresTime = () => {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toUTCString();
}

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
    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';
    console.log("cookieStr: ", cookieStr)
    cookieStr.split(";").forEach(item => {
        if (!item) return;
        const arr = item.split("=");
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })
    // // 解析session
    // let needSetCookie = false;
    // let userId = req.cookie.userId;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {};
    //     } 
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    //     console.log(userId)
    // }
    // req.session = SESSION_DATA[userId];

    // 使用redis解析session
    let needSetCookie = false;
    let userId = req.cookie.userId;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        // 初始化 session
        set(userId, {});
    }
    // 获取session
    req.sessionId = userId;
    get(req.sessionId).then(sessionData => {
        if(sessionData == null) {
            req.session = {};
            set(req.sessionId, req.session);
        } else {
            req.session = sessionData;
        }
        return getPostData(req);
    }).then(postData => {
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
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${_expiresTime()}`);
            }
            res.end(JSON.stringify(data));
            return;
        }
    })
};

module.exports = serverHandle;