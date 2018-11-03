/**
 * Created by meng on 2018/11/2.
 */
const express = require('express');
//引入连接数据库模块
const db = require('./db');

const router = require('./router');
const app = express();

(async () => {
  await db;
  app.use(router);
})()

app.listen(4000, err => {
  if(!err) console.log('服务器启动')
  else console.log(err)
})
