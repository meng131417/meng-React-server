/**
 * Created by meng on 2018/11/2.
 */
//引入mongoose模块
const mongoose = require('mongoose');

module.exports = new Promise((resolve,reject) => {
  //链接数据库
  mongoose.connect('mongodb://localhost:27017/zhipin',{useNewUrlParser:true});
  //绑定事件监听
  mongoose.connection.once('open',err => {
    if(!err){
      console.log('数据库链接')
      resolve()
    }else{
      console.log(err)
      reject()
    }
  })
})