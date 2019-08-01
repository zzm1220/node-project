const fs = require("fs");
const path = require("path");

const fileName = path.resolve(__dirname, 'data.txt');
// 读取文件
// fs.readFile(fileName, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     // data是二进制类型，需要转换为字符串；
//     console.log(data.toString());
// })

// 写入文件
// const content = "这是写入的内容\n";
// const opt = {
//     flag: 'a'
// }
// fs.writeFile(fileName, content, opt, err => {
//     if (err) {
//         console.error(err);
//     }
// });

fs.stat(fileName, (err, stats) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(stats)
})