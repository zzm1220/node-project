const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
   const method = req.method;
   const url = req.url;
   const path = url.split('?')[0];
   const query = querystring.parse(url.split('?')[1]);

   // 设置返回的数据格式
   res.setHeader('Content-type', 'application/json');

   // 定义返回的数据
   const resData = {
        method,
        url,
        path,
        query
   };
   if (method === "GET") {
       res.end(
           JSON.stringify(resData)
       )
   } else if (method === "POST") {
       const contentType = req.headers["content-type"];
       console.log(contentType);
       let postData = "";
       req.on("data", chunk => {
           postData += chunk;
       });
       req.on("end", () => {
           resData.postData = postData;
           res.end(
               JSON.stringify(resData)
           )
       })
   } 
})
server.listen(3000, () => {
    console.log("listen at 3000");
})