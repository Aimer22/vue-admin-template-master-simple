import request from '@/utils/request'

export default {
    // 根据三级分类后获取平台属性
    getList(category1Id, category2Id, category3Id){
        return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
    },


    // 根据id删除某个平台属性
    delete(attrId){
        return request.delete(`/admin/product/deleteAttr/${attrId}`)
    },

    // 根据id获取某个属性，属性值的列表
    addOrUpdate(attr){
        return request.post('/admin/product/saveAttrInfo',attr)
    }


    // POST /admin/product/saveAttrInfo
}