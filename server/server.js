// 起nodejs server
// require('babel-polyfill')

let window
let document
if ( typeof window == "undefined" ) {
  window = global
  document = window.document
}
let Koa = require('koa')
let send = require('koa-send')
let path = require('path')
let koaBody = require('koa-body')
// const koaSession = require('koa-session')

let staticRouter = require('./routers/static') // 处理打包后的路径

let ServerRun = require("./serverRun.js");

var program = require('commander')
var cluster = require('cluster')




var fundebug = require("fundebug-nodejs");
fundebug.apikey="2588e76910aed3d9036501971f96b35054a5b6debb263e3c04609dce2ab64e0f";


let isDev = process.env.NODE_ENV === 'development'
let logger

if ( isDev ) {
  // const easyMonitor = require('easy-monitor');
  // easyMonitor('官网');
  logger = {
    info: (data) => {
     // console.log(data)
    }
  }
} else {
  let log4js = require('log4js');
  log4js.configure({
    replaceConsole: true,
    appenders: {
      cheese: {
        // 设置类型为 dateFile
        type: 'dateFile',
        // 配置文件名为 myLog.log
        filename: '/data/applog/logs/kr-web/myLog.log',
        // 指定编码格式为 utf-8
        encoding: 'utf-8',
        // 配置 layout，此处使用自定义模式 pattern
        layout: {
          type: "pattern",
          // 配置模式，下面会有介绍
          pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
        },
        // 日志文件按日期（天）切割
        pattern: "-yyyy-MM-dd",
        // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
        keepFileExt: true,
        // 输出的日志文件名是都始终包含 pattern 日期结尾
        alwaysIncludePattern: true,
      },
    },
    categories: {
      // 设置默认的 categories
      default: {appenders: ['cheese'], level: 'debug'},
    }
  });
  logger = log4js.getLogger();
}


// 设置cookies，到期时间
// app.key = ['vue ssr']
// app.use(koaSession({
//   key: 'v-ssr-id',
//   maxAge: 2 * 60 * 60 * 1000
// }, app))

/*
* koa中间键
* 处理所有的请求 context
*/



var numCPUs = 5;
if (cluster.isMaster) {
    //console.log(`This machine has ${numCPUs} CPUs.`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });


    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log("Starting a new worker...");
        cluster.fork();
    });
} else {
 const app = new ServerRun(3333 ,'0.0.0.0');
   app.start();
}
// const app = new ServerRun(3334 ,'0.0.0.0');
// app.start();






