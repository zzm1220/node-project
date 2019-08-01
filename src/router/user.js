const { login } = require("../controller/user");
const { set } = require("../db/redis.js");
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModal");


const handleUserRouter = (req, res) => {
    const method = req.method;

    if (method === "POST" && req.path === "/api/user/login") {
        const postData =req.body;
        const {username, password } = postData;
        const result = login(username, password);
        return result.then(resData => {
            console.log(resData)
            if (resData.username) {
                req.session.username = resData.username;
                req.session.realname = resData.realname;
                set(req.sessionId, req.session);
                return new SuccessModel("登录成功");
            } else {
                return new ErrorModel("登录失败"); 
            }
        })
    }

}

module.exports = handleUserRouter;