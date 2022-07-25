<template>
  <div>
    <!-- 第一个card是三级联动 -->
    <el-card>
      <CategorySelector @changeCategory = "changeCategory"></CategorySelector>
    </el-card>
    <el-card style="margin-top:20px"></el-card>
  </div>
</template>

<script>
export default {
  data:{
    category1Id:'',
    category2Id:'',
    category3Id:''
  },
  methods:{
    // 子组件传到父组件，父组件根据category进行发送请求
    async changeCategory({categoryId, level}){
      console.log(categoryId,level);
      if(level === 1){
        this.category1Id = categoryId
      }else if(level === 2){
        this.category2Id = categoryId
      }else{
        this.category3Id = categoryId
      }

      const result =  await this.$API.attr.getList(this.category1Id,this.category2Id,this.category3Id)
      if(result === 200){
        console.log('属性已经拿到--->',result.data);
      }
    }
  }
}
</script>

<style lang="scss">

</style>