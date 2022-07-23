const express = require('express') // express框架
const app = express()
// 设置跨域
let cors = require('cors')

// 配置路由
let router = require('./router.js')


const bodyParser = require('body-parser') 
// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
// 以json格式返回出去
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 向用户开放可以访问指定的文件
app.use(express.static('public'))


app.use(cors())
app.use(router)

// 监听端口
app.listen(3030, ()=>{
    console.log('3030监听当中。。。');
})   




