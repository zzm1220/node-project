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
const handleBlogRouter = (req, res) => {
    const method = req.method;
    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author || "";
        const keyword = req.query.keyword || "";
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
        const author = "zhimin";
        req.body.author = author;
        const postData = req.body;
        const result = newBlog(postData);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }
    // 更新一篇博客
    if (method === "POST" && req.path === "/api/blog/update") {
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
        const id = req.query.id;
        const author = "lisi"; // 假数据，后期登录后修改；
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