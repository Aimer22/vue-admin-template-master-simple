// 此文件对数据库进行增删改查的操作
// 引入mongodb配置
var conn = require('../db.js')
// 解决接收不到formdata文件类型的问题
let multiparty = require('multiparty');

// 获取mongoDB的ObjectId对象，方便接下来的修改数据
var ObjectId = require('mongodb').ObjectId


exports.getTrademarkList = ( req, res ) => {
  conn.collection('user_info').find({}).toArray((err, data) => {
        // 操作数据库完成以后要关闭数据库连接
        // client.close();
        console.log('拿到数据了');
        // console.log(data.length);
        let data1 =  {
          code: 200,
          message: "nodejs返回成功",
          data: {
            records:data,
            total: data.length
          }
        }
        res.end(JSON.stringify(data1))
    })
}

exports.editTrademark = (req, res) => {
  let {_id, tmName, logoURL } = req.body
  // 获取数据库的_id
  console.log('前端发来的id',_id);
  console.log('前端发来的id',logoURL);
  // 开始更新数据库中的信息
  
  conn.collection('user_info').updateMany(
    {"_id":new ObjectId(_id)},
    {$set:{tmName:tmName,logoURL:logoURL}},
  )

  // 返回相应数据
  let result =  {
    code: 200,
    message: "修改数据成功！",
    data: {
      records:'',
    }
  }
  res.end(JSON.stringify(result))
  
}

// 用户文件类型的上传保存
exports.uploadAvatar = (req, res) => {
  let form = new multiparty.Form();
  let path = require('path')
  // 将文件保存至服务器文件夹中
  form.uploadDir = path.resolve(__dirname,'../public/images')
  form.keepExtensions=true;   //是否保留后缀
  form.autoFiels=true;       //启用文件事件，并禁用部分文件事件，如果监听文件事件，则默认为true。
  form.parse(req, function(err, fields, files){

      imgpath = files.file[0].path
      const imgName = imgpath.slice(imgpath.lastIndexOf('\\')+1)
      // 设置图片最终保存路径
      const srcPath = 'http://localhost:3030/images/'+ imgName

      // 向前端返回数据
      let result =  {
        code: 200,
        message: "头像上传成功！",
        data: srcPath
      }
      res.end(JSON.stringify(result))

  })
}
// 添加新用户
exports.addTrademark = (req, res) => {
  let {_id, tmName, logoURL } = req.body
  conn.collection('user_info').insertOne({tmName:tmName,logoURL:logoURL},
  )
  let result =  {
    code: 200,
    message: "添加成功，请到最后一页查看！",
    data: {
      records:'',
    }
  }
  res.end(JSON.stringify(result))
}

// 根据id删除
exports.deleteTrademark = (req, res) => {
  // console.log(req.body);
  // let {_id} = req.body
  // console.log(req.params.id); 
  conn.collection('user_info').deleteOne({"_id":new ObjectId(req.params.id)})
  // 返回相应数据
  let result =  {
    code: 200,
    message: "删除数据成功！",
    data: {
      records:'',
    }
  }
  res.end(JSON.stringify(result))
}

exports.uploadAvatar1 = (req, res) => {
  
  let form = new multiparty.Form();
  let path = require('path')
  let imgpath = ''
  let avatarid = ''
  console.log('项目路径为---->',__dirname);
  form.uploadDir = path.resolve(__dirname,'../public/images')
  form.keepExtensions=true;   //是否保留后缀
  form.autoFiels=true;       //启用文件事件，并禁用部分文件事件，如果监听文件事件，则默认为true。
  console.log(form.uploadDir);
  form.parse(req, function(err, fields, files){
    
    avatarid = fields.avatarid[0];
    imgpath = files.file[0].path
    /* console.log(avatarid);
    console.log(files.file[0]); */
    // console.log('http://localhost:3030'+imgpath.split('public')[1]);

    conn.query(`update userinfo_tb set avatar='${imgpath.replaceAll('\\','\\\\')}' where id=${avatarid}`,(err, result) => {
      if(err){
        data = {
          desc:'执行失败！'
        }
      }else{
        data ={
          err: 0,
          desc:'执行成功！',
          avatarImg: 'http://localhost:3030'+imgpath.split('public')[1]
        }
        res.end(JSON.stringify(data))
      }
    })
  })
  
}


