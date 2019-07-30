const { login } = require("../controller/user");
const {
    SuccessModel,
    ErrorModel
} = require("../model/resModal");

const handleUserRouter = (req, res) => {
    const method = req.method;

    if (method === "POST" && req.path === "/api/user/login") {
        const postData =req.body;
        const { username, password } = postData;
        const result = login(username, password);
        return result.then(res => {
            console.log(res)
            if (res.username) {
                return new SuccessModel("登录成功");
            } else {
                return new ErrorModel("登录失败"); 
            }
        })
    }
}

module.exports = handleUserRouter;