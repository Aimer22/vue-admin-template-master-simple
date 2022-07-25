// 此文件对分类数据库进行增删改查的操作
// 引入mongodb配置
var conn = require('../mongoose.js')
// 解决接收不到formdata文件类型的问题
let multiparty = require('multiparty');
const { Schema } = require('mongoose');

// 获取mongoDB的ObjectId对象，方便接下来的修改数据
var ObjectId = require('mongodb').ObjectId

/* var tradeMarkSchema = new mongoose.Schema({
	tmName:String,
	tmLogo:String
}) */




// 获取一级分类列表
exports.getCategory1 = (req, res) => {
    console.log('dsadsad');
    conn.collection('attrList').find({},{categoryName:1}).toArray((err, data) => {
        
            let result = {
                code: 200,
                message:'返回成功！',
                data:data
            }

            res.end(JSON.stringify(result))
        // }
    })
}

// 获取二级分类列表
exports.getCategory2 = (req, res) => {
    const cate1Id = req.params.id
    conn.collection('category2').find({cate1_id:cate1Id}).toArray((err, data) => {
        // if(data){
            // console.log(data)
            let result = {
                code: 200,
                message:'返回成功！',
                data:data
            }

            res.end(JSON.stringify(result))
        // }
    })
}

// 获取三级分类列表
exports.getCategory3 = (req, res) => {
    const cate2Id = req.params.id
    conn.collection('category3').find({cate2_id:cate2Id}).toArray((err, data) => {
        // if(data){
            // console.log(data)
            let result = {
                code: 200,
                message:'返回成功！',
                data:data
            }

            res.end(JSON.stringify(result))
        // }
    })
}