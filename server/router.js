let express = require('express')

let router = express.Router()

let user = require('./api/userApi') //导入数据库操作
let category = require('./api/category')
let attr = require('./api/attr')

router.get('/admin/product/trademarkList', user.getTrademarkList)
router.put('/admin/product/editTrademark', user.editTrademark)
router.post('/admin/product/uploadAvatar', user.uploadAvatar)
router.post('/admin/product/addTrademark', user.addTrademark)
router.delete('/admin/product/deleteTrademark/:id', user.deleteTrademark)

router.get('/admin/product/getCategory1',attr.getCategory1)
router.get('/admin/product/getCategory2/:id',attr.getCategory2)
router.get('/admin/product/getCategory3/:id',attr.getCategory3)

router.get('/admin/product/attrInfoList/:category1Id/:category2Id/:category3Id',attr.getList)

module.exports = router