<template>
  <div>
    <el-form :inline="true" :model="cForm" class="demo-form-inline">       
        <el-form-item label="一级分类">
            <!-- 选中哪一项，最终我们选择的是他的id -->
            <el-select v-model="cForm.category1Id" placeholder="请选择" @change="changeCategory1">
                <el-option
                v-for="(c1, index) in category1List" 
                :label="c1.categoryName"
                :value="c1.id"
                :key="c1.id"></el-option >
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="cForm.category2Id" placeholder="请选择" @change="changeCategory2">
                <el-option 
                v-for="(c2, index) in category2List" 
                :label="c2.categoryName"
                :value="c2.id"
                :key="c2.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="cForm.category3Id" placeholder="请选择" @change="changeCategory3">
                <el-option 
                v-for="(c3, index) in category3List" 
                :label="c3.name"
                :value="c3.cate3_id"
                :key="c3.cate3_id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'',
    data(){
        return {
            cForm: {
                category1Id:'',
                category2Id:'',
                category3Id:''
            },
            category1List: [],
            category2List: [],
            category3List: []
        }
    },
    mounted(){
        this.getCategoryList1()
    },
    methods:{
        async getCategoryList1(){
            
            const result =  await this.$API.category.getCategory1();
            
            if(result.code === 200){
                console.log('node返回的：',result.data);
                
                this.category1List = result.data
            }else{

            }
        },
        async changeCategory1( id ){

            this.$emit('changeCategory',{categoryId: id, level:1})
            // 清空二级和三级
            this.cForm.category2Id = ''
            this.category2List = []
            this.cForm.category3Id = ''
            this.category3List = []
            
            const result =  await this.$API.category.getCategory2( id );
            if(result.code === 200){
                console.log('node返回的分类列表：',result.data);
                this.category2List = result.data
            }else{

            }
        },
        async changeCategory2( id ){
            this.$emit('changeCategory',{categoryId: id, level:2})
            // 三级的选项
            this.cForm.category3Id = ''
            this.category3List = []
            
            console.log(id);
            const result =  await this.$API.category.getCategory3( id );
            if(result.code === 200){
                console.log('node返回的耳机分类列表：',result.data);
                this.category3List = result.data
            }else{

            }
        },
        async changeCategory3( id ){
            this.$emit('changeCategory',{categoryId: id, level:3})
        }
    }
}
</script>

<style>

</style>