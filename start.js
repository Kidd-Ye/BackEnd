const router = require('./router');
const express = require('express');
const config = require('./config');
const server = express();

// 初始化路由
router(server);

// start node server using express
const startServer = function(){
	server.listen(config.port, () => {
		console.log(`server is running at port ${config.host}:${config.port}`);
	});
};


startServer();
