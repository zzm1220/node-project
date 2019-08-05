const fs = require("fs");
const path = require("path");

const fileName1 = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, "data-bak.txt");
// 复制文件
const readStream = fs.createReadStream(fileName1);
const writeStream = fs.createWriteStream(fileName2);
readStream.pipe(writeStream);

readStream.on('end', () => {
    console.log("拷贝完成!!!");
});