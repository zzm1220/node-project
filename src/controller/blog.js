const { exec } = require("../db/mysql.js");

const getList = (author, keyword) => {
    let sql = `select * from bogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createTime desc`;
    return exec(sql);
}

const getDetail = id => {
    let sql = `select * from bogs where id='${id}'`;
    return exec(sql).then(rows => rows[0]);
}

const newBlog = (blogData = {}) => {
    const title = blogData.title;
    const content =blogData.content;
    const author = blogData.author;
    const createTime = Date.now();
    let sql = `insert into bogs (author, title, content, createTime) values ('${author}', '${title}', '${content}', '${createTime}');`;
    return exec(sql).then(res => {
        return {
            id: res.insertId
        }
    });
}

const updateBlog = (id, blogData={}) => {
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update bogs set title='${title}', content='${content}' where id='${id}';`;
    return exec(sql).then(res=>{
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const deleteBlog = (id, author) => {
    const sql = `delete from bogs where id='${id}' and author='${author}'`;
    return exec(sql).then(res => {
        console.log(res)
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}