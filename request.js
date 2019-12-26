var express = require('express');
var app = express();
var http = require('http');

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
});

app.get('/mess', function(request, response){

  	// 输出 JSON 格式
	data = {
	   'first_name':'roby',
	   'last_name':'zhou'
	};
	console.log(data);
	// response.end(JSON.stringify(data));
	// response.json(data);
	// return response.send("callback("+JSON.stringify(data)+")");
	return response.send(JSON.stringify(data));
});

app.get('/once', function(request, response){

	http.get({
	  hostname: '127.0.0.1',
	  port: 4100,
	  path: '/mess',
	  agent: false  // 创建一个新的代理，只用于本次请求
	}, (res) => {
	  let data = {
	   'first_name':'roby',
	   'last_name':'zhou'
	  };
	  // response.end(JSON.stringify(data));
	  // response.json(data);
	  return response.send("callback("+JSON.stringify(data)+")");
	  // response.end();
	});
});


app.get('/test', function(request, response){

	http.get("http://www.weather.com.cn/data/sk/101280501.html", function(res) {
	  console.log("Got response: " + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        response.send("callback("+JSON.stringify(chunk)+")");
        response.end();
      });
      res.on('end',function(){
        console.log('No more data in response.********');
      });
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
});

//引入路由
const multerUpload = require('./uploadFiles');
//使用路由
app.use('/upload', multerUpload);

app.listen(4100);
console.log("strat 4100");
