// 此文件对分类数据库进行增删改查的操作
// 引入mongodb配置
var conn = require('../mongoose.js')
// 解决接收不到formdata文件类型的问题
let multiparty = require('multiparty');
const { Schema } = require('mongoose');

// 获取mongoDB的ObjectId对象，方便接下来的修改数据
var ObjectId = require('mongodb').ObjectId

// 三级分类
const attrListSchema = new Schema({
    id:String,
    category3:String,
    name:String,
    content:String
})

// 二级分类菜单
const category2Schema = new Schema({
    id:String,
    category2:String,
    categoryName:String,
    children:[attrListSchema]
})

// 一级分类
const category1Schema = new Schema({
    id:String,
    category1:String,
    categoryName:String,
    children:[category2Schema]
})

const categoryModel = conn.model('attrList',category1Schema)
/* const category2Model = conn.model('category2',category1Schema)
const category3Model = conn.model('category3',category1Schema) */




// console.log(category1Schema.id);
/* categoryModel.create([
    {
        id:'1',
        category1:'一级分类',
        categoryName:'手机',
        children:[
            {
                id:'1-1',
                category2:'二级分类',
                categoryName:'小米手机',
                children:[
                    {
                        id:'1-1-1',
                        category3:'三级分类',
                        name:'小米3',
                        content:'小米手机，不在为发烧而生！',
                    },
                    {
                        id:'1-1-2',
                        category3:'三级分类',
                        name:'RedMi',
                        content:'红米手机啦啦啦！',
                    },
                    {
                        id:'1-1-3',
                        category3:'三级分类',
                        name:'小米最新款',
                        content:'小米新发布的版本！',
                    },
                ]
            },
            {
                id:'1-2',
                category2:'二级分类',
                categoryName:'华为手机',
                children:[
                    {
                        id:'1-2-1',
                        category3:'三级分类',
                        name:'华为p30',
                        content:'华为，中国人的骄傲！',
                    },
                    {
                        id:'1-2-2',
                        category3:'三级分类',
                        name:'RedMi',
                        content:'华为，中国人的骄傲！',
                    },
                    {
                        id:'1-2-3',
                        category3:'三级分类',
                        name:'小米最新款',
                        content:'华为，中国人的骄傲！',
                    },
                ]
            }
        ]
    
    },
    {
        id:'2',
        category1:'一级分类',
        categoryName:'电脑',
        children:[
            {
                id:'2-1',
                category2:'二级分类',
                categoryName:'平板电脑',
                children:[
                    {
                        id:'2-1-1',
                        category3:'三级分类',
                        name:'ipad',
                        content:'ipad，轻便小巧！',
                    },
                    {
                        id:'2-1-2',
                        category3:'三级分类',
                        name:'华为平板',
                        content:'超快的平板！',
                    },
                    {
                        id:'2-1-3',
                        category3:'三级分类',
                        name:'小米平板',
                        content:'嘎嘎地！',
                    },
                ]
            },
            {
                id:'2-2',
                category2:'二级分类',
                categoryName:'笔记本',
                children:[
                    {
                        id:'2-2-1',
                        category3:'三级分类',
                        name:'超神火影',
                        content:'超耐用，可以用十年',
                    },
                    {
                        id:'2-2-2',
                        category3:'三级分类',
                        name:'暗夜精灵',
                        content:'打游戏超快的哦！',
                    },
                    {
                        id:'2-2-3',
                        category3:'三级分类',
                        name:'华为商用本',
                        content:'轻薄好用！',
                    },
                ]
            }
        ]
    
    },
    {
        id:'3',
        category1:'一级分类',
        categoryName:'乐器',
        children:[
            {
                id:'3-1',
                category2:'二级分类',
                categoryName:'木吉他',
                children:[
                    {
                        id:'3-1-1',
                        category3:'三级分类',
                        name:'马丁',
                        content:'面单，最纯粹的声音！',
                    },
                    {
                        id:'3-1-2',
                        category3:'三级分类',
                        name:'摩尔吉他',
                        content:'原生拾音器，享受极致听感！',
                    },
                    {
                        id:'3-1-3',
                        category3:'三级分类',
                        name:'麦杰克',
                        content:'国际品牌嘎嘎地！',
                    },
                ]
            },
            {
                id:'3-2',
                category2:'二级分类',
                categoryName:'电吉他',
                children:[
                    {
                        id:'3-2-1',
                        category3:'三级分类',
                        name:'fender电吉他',
                        content:'日芬，美芬随你挑',
                    },
                    {
                        id:'3-2-2',
                        category3:'三级分类',
                        name:'基普森',
                        content:'枫木指板，24品',
                    },
                    {
                        id:'3-2-3',
                        category3:'三级分类',
                        name:'suhr',
                        content:'超强双线圈，摇滚起来吧！',
                    },
                ]
            },
            {
                id:'3-4',
                category2:'二级分类',
                categoryName:'音箱',
                children:[
                    {
                        id:'3-3-1',
                        category3:'三级分类',
                        name:'Boss音箱',
                        content:'来自80年代的声音',
                    },
                    {
                        id:'3-3-2',
                        category3:'三级分类',
                        name:'PositiveGrid',
                        content:'桌面蓝牙音箱，居家练习神器',
                    },
                    {
                        id:'3-3-3',
                        category3:'三级分类',
                        name:'Fender',
                        content:'缺货中。。。',
                    },
                ]
            }
        ]
    
    }
],function(){
    console.log('创建成功');
}) */
/* categoryModel.create({
    id:'1-1',
    category2:'二级分类',
    categoryName:'小米手机'
},function(){
    console.log('创建成功');
}) */

// var cc =  parent.children.id({_id:new ObjectId("62de313d978f6c9aac09cf24")})
// console.log(cc);
/* categoryModel.find({id:'2-1'},{children:1},function(err, docs){
    if(!err ){
        const result = []
        // console.log(docs[0].children);
        docs[0].children.forEach(item => {
            // console.log(item.categoryName);
            result.push(item.categoryName)
        })
        console.log(result);
    }
}) */

exports.getCategory1 = (req, res) => {
    categoryModel.find({},{categoryName:1,id:1},function(err, docs){
        if(!err ){
            let result = {
                code: 200,
                message:'返回成功！',
                data:docs
            }
        
            res.end(JSON.stringify(result))
        }
    })
    
}
exports.getCategory2 = (req, res) => {
    const id = req.params.id
    /* categoryModel.find({id:id},function(err, docs){
        if(!err ){
            // console.log(docs);
        }
    }) */
    categoryModel.find({id:id},{children:1},function(err, docs){
        if(!err ){
            const idArr = []
            docs[0].children.forEach(item => {
                idArr.push(item)
            })
            
            let result = {
                code: 200,
                message:'返回成功！',
                data:idArr
            }
        
            res.end(JSON.stringify(result))
        }
    })
    
}

exports.getCategory3 = (req, res) => {
    const id1 = req.params.id.slice(0,1)
    const id2 = req.params.id
    console.log(id1,id2);
    categoryModel.find({id:id1,},{children:1},function(err,docs){
        if(!err){
            var idArr = []
            docs.forEach(item => {
                for(var i=0 ; i<item.children.length; i++){
                    console.log(item.children[i].id);
                    if(item.children[i].id === id2){
                        console.log(item.children[i].children);
                        for(var j=0; j<item.children[i].children.length; j++){
                            idArr.push(item.children[i].children[j])
                        }
                    }
                }
            })
            let result = {
                code: 200,
                message:'返回成功！',
                data:idArr
            }
        
            res.end(JSON.stringify(result))
        }
    })
}
exports.getList  = (req, res) => {
    
    
   
}