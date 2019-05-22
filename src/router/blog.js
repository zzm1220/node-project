const { getList, getDetail } = require("../controller/blog");
const { SuccessModal, ErrorModal} = require("../model/resModal");

const blogRouter = (req, res) => {
    // method
    const method = req.method;

    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        const author = req.query.author||"";
        const keyword = req.query.keyword||"";
        const listData = getList(author, keyword);
        return new SuccessModal(listData, "success");
    }
    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        const id = req.query.id;
        const detailData = getDetail(id);
        return new SuccessModal(detailData, "success");
    }
    // 新增博客
    if (method === "POST" && req.path === "/api/blog/new") {
        return {
            msg: "新增博客"
        }
    }
    // 更新博客
    if (method === "POST" && req.path === "/api/blog/update") {
        return {
            msg: "更新博客"
        }
    }
    // 删除博客
    if (method === "POST" && req.path === "/api/blog/del") {
        return {
            msg: "删除博客"
        }
    }
};

module.exports = blogRouter;