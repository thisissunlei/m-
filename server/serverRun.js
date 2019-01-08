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



var program = require('commander')
var cluster = require('cluster')





let isDev = process.env.NODE_ENV === 'development'
let logger

if ( isDev ) {
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
module.exports = class serverRun{
  constructor(PORT,HOST){
    //let HOST = process.env.HOST || '0.0.0.0'
    //let PORT = process.env.PORT || 3334
    this.HOST = HOST || '0.0.0.0'
    this.PORT = PORT || 3333
    this.app = new Koa();
  }
  start(){
    this.app.use(async (ctx, next) => {
      console.log(`This is server process : ${process.pid} `);
      try {
        logger.info('官网res：' + new Date()+'url:'+ctx.host+ctx.path);
        await next()
      } catch (err) {
        logger.info('官网err：' + new Date()+'url:'+ctx.host+ctx.path+'err:'+err);
      }
    })


    // 处理favicon.ico的渲染
    this.app.use(async (ctx, next) => {
     
      if (ctx.path === '/favicon.ico' || ctx.path === '/static/heatmap.min.js') {
        /* ?? koa-send koa的中间件 处理静态文件 实现文件下载功能
        * 在某些中间件中进行调用，传入当前请求的Context及文件对应的位置，然后实现功能
        * favicon.ico ？？
        */
        await send(ctx, ctx.path, { root: path.join(__dirname, '../') })
      } else if ( ctx.path.indexOf('.xml') > 0 ) {
        await send(ctx, ctx.path, { root: path.join(__dirname, '../static') })
      } else {
        await next()
      }
    })

    /*
    * 使用koa-body 来代替 koa-bodyparser来处理post请求、代替 koa-multer来处理图片上传
    * allowedMethods() ?? 是koa-router 的方法，处理的业务是当所有路由中间件执行完成之后,若ctx.status为空或者404的时候,丰富response对象的header头
     */
    this.app.use(koaBody())
    this.app.use(staticRouter.routes()).use(staticRouter.allowedMethods())


    let pageRouter
    if (isDev) {
      pageRouter = require('./routers/dev-ssr')
    } else {
      pageRouter = require('./routers/ssr')
    }
    this.app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

    // server端口


    this.app.listen(this.PORT , this.HOST, () => {

      // console.log(`server is listening on ${HOST}:${PORT}`)
    });
    this.app.on("error", (e) => {
      logger.info('官网errall：' + JSON.stringify(e));
        //console.log(`SEVERE ERROR: ${e.message}`)
    } );
  }
}




// var numCPUs = 5;

// if (cluster.isMaster) {
//     //console.log(`This machine has ${numCPUs} CPUs.`);
//     for (let i = 0; i < numCPUs; i++) {

//         cluster.fork();

//     }

//     cluster.on("online", (worker) => {
//         console.log(`Worker ${worker.process.pid} is online`);
//     });

//     cluster.on("exit", (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
//         console.log("Starting a new worker...");
//         cluster.fork();
//     });

// } else {
//   console.log(111111111,PORT )


// }







