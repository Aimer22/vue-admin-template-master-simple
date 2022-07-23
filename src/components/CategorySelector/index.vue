<template>
  <div>
    <el-form :inline="true" :model="cForm" class="demo-form-inline">       
        <el-form-item label="一级分类">
            <!-- 选中哪一项，最终我们选择的是他的id -->
            <el-select v-model="cForm.vategory1Id" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="cForm.vategory2Id" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="cForm.vategory3Id" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
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
            cForm: {},
            vategory1Id:'',
            vategory2Id:'',
            vategory3Id:''
        }
    }
}
</script>

<style>

</style>