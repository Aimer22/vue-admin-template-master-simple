import request from '@/utils/request'

export default {
    // 每个接口请求函数就是这个对象当中的一个方法
    getPageList(page,limit){
        return request.get(`/admin/product/trademarkList`)
    },

    delete(id){
        return request.delete(`/admin/product/deleteTrademark/${id}`)
    },

    // 增加新的品牌，是不需要id的，修改一个品牌是需要id的
    // 增加品牌和修改品牌，最终都要传一个对象 请求体参数
    // 根据id是否存在来判断请求方式是添加还是修改
    addOrUpdata(trademark){
        console.log(trademark);
        if(trademark._id){
            return request.put(`/admin/product/editTrademark`,trademark)
        }else{
            return request.post('/admin/product/addTrademark',trademark)
        }
    }
    

}

// 默认暴露 最终暴露出去的是个什么东西  对象
/* 
    默认暴露出去的对象 是以default为属性，default后面的值为值的对象

*/

// 部分暴露 最终暴露出去是个什么东西    对象

// 整体暴露 最终暴露的是个什么东西  对象