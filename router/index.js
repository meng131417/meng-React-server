/**
 * Created by meng on 2018/11/2.
 */
const express = require('express');
const Users = require('../models/users');
const md5 = require('blueimp-md5');

const Router = express.Router;
const router = new Router();

//解析请求体的数据
router.use(express.urlencoded( {extended: true}));

//登录路由
router.post('/login', async(req,res) => {
  //收集请求数据
  const {username,password} = req.body;
  //判断是否合法
  if(!username || !password){
    res.json({
      code: 2,
      msg: '用户输入不合法'
    })
    return;
  }
  //在数据库查找是否有用户名和密码
  try{
    const data = await Users.findOne({username, password: md5(password)});
    if(data){
      res.json({
        code: 0,
        data: {
          _id: data._id,
          username: data.username,
          type: data.type
        }
      })
    }else{
      res.json({
        code: 1,
        msg: '用户名和密码输入不对'
      })
    }
  }catch(e){
    res.json({
      code: 3,
      msg: '网络不稳定，请刷新'
    })
  }

})

//注册路由
router.post('/register', async(req,res) => {
  //收集请求数据
  const {username,password,type} = req.body;
  //判断是否合法
  if(!username || !password || !type){
    res.json({
      code: 2,
      msg: '用户输入不合法'
    })
    return;
  }
  //在数据库查找是否注册
  try{
    const data = await Users.findOne({username});
    if(data){
     res.json({
       code: 1,
       msg: '用户名已存在'
     })
    }else{
      const data = await Users.findOne({username, password:md5(password), type})
      res.json({
        code: 0,
        _id: data._id,
        username: data.username,
        type: data.type
      })
    }
  }catch(e){
    res.json({
      code: 3,
      msg: '网络不稳定，请刷新'
    })
  }
})

module.exports = router;
