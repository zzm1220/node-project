const {
    SuccessModel,
    ErrorModel
} = require("../model/resModal");
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/blog");

// 统一的登录验证
const _loginCheck = (req) => {
    // 未登录
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        let author = req.query.author || "";
        const keyword = req.query.keyword || "";
        if (req.query.isadmin) {
            const loginCheckResult = _loginCheck(req);
            if (loginCheckResult) {
                return loginCheckResult;
            }
            author = req.session.username;
        }
        const result = getList(author, keyword);
        return result.then(listData => {
            return new SuccessModel(listData);
        })
    }
    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        const id = req.query.id || 1;
        const detailResult = getDetail(id);
        return detailResult.then(detailData => {
            return new SuccessModel(detailData);
        });
    }
    // 新建博客
    if (method === "POST" && req.path === "/api/blog/new") {
        // author 假数据，待开发登录后修改
        const loginCheckResult = _loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        const author = req.session.username;
        req.body.author = author;
        const postData = req.body;
        const result = newBlog(postData);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    // 更新一篇博客
    if (method === "POST" && req.path === "/api/blog/update") {
        const loginCheckResult = _loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        const id = req.query.id;
        const postData = req.body;
        const result = updateBlog(id, postData);
        return result.then(res => {
            if (res) {
                return new SuccessModel("更新博客成功");
            } else {
                return new ErrorModel("更新博客失败");
            }
        })
    }
    // 删除一篇博客
    if (method === "POST" && req.path === "/api/blog/del") {
        const loginCheckResult = _loginCheck(req);
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult;
        }
        const id = req.query.id;
        const author = req.session.username; // 假数据，后期登录后修改；
        const result = deleteBlog(id, author);
        return result.then(res => {
            if (res) {
                return new SuccessModel("删除博客成功");
            } else {
                return new ErrorModel("删除博客失败");
            }
        })
    }
}

module.exports = handleBlogRouter;