const fs = require("fs");
const path = require("path");

// 生成 wirte stream
function createWriteStream(filename) {
    const fullFileName = path.join(__dirname, "../../logs", filename);
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    });
    return writeStream;
};
// 写访问日志stream
const accssWriteStream = createWriteStream("access.log");
const eventWriteStream = createWriteStream("event.log");
const errorWriteStream = createWriteStream("error.log");

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n'); // 写入一行日志
}

const access = log => {
    writeLog(accssWriteStream, log);
};
const event = log => {
    writeLog(eventWriteStream, log);
}
const error = log => {
    writeLog(errorWriteStream, log);
}

module.exports = {
    access,
    event,
    error
}