var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定相应的端口号,例如\nnode server.js 8888 ");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  console.log("有人发请求过来啦！路径（带查询参数）为：" + pathWithQuery);

  //设置响应状态码
  response.statusCode = 200;
//   默认路径为 index.html
  const filePath = path === "/" ? "/index.html" : path;
  const suffixIndex = filePath.lastIndexOf(".");
  const suffix = filePath.substring(suffixIndex);
  let fsString
  try {
    fsString = fs.readFileSync(`./public${filePath}`);
  }catch(error){
      fsString = '你请求的文件不存在'
      response.statusCode = 404
  }
  const suffixTable = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
  };
  response.setHeader("Content-Type", `${suffixTable[suffix] || 'text/html'};charset=utf-8`);
  response.write(fsString);
  response.end();

});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
