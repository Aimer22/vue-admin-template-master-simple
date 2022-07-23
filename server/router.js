let express = require('express')

let router = express.Router()

let user = require('./api/userApi') //导入数据库操作

router.get('/admin/product/trademarkList', user.getTrademarkList)
router.put('/admin/product/editTrademark', user.editTrademark)
router.post('/admin/product/uploadAvatar', user.uploadAvatar)
router.post('/admin/product/addTrademark', user.addTrademark)
router.delete('/admin/product/deleteTrademark/:id', user.deleteTrademark)

module.exports = router