const getList = (author, keyword) => {
    // 返回假数据
    return (
        [
            {
                id: 1,
                title: '标题A',
                content: '内容A',
                createTime: 1558514475474,
                author: 'zhi'
            },
            {
                id: 2,
                title: '标题B',
                content: '内容B',
                createTime: 1558514525921,
                author: 'zhiMIN'
            }
        ]
    )
}

const getDetail = id => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1558514475474,
        author: 'zhi'
    }
}

module.exports = {
    getList,
    getDetail
}