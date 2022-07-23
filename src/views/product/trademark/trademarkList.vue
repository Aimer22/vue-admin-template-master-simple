<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
    <el-table 
      :data="trademarkList"
      style="margin: 20px 0; width:100%;"
      ref="mytable"
      :row-class-name="rowClassName"
      class="panel-table"
      border>
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80" 
        prop="id">
      </el-table-column>
      <el-table-column
        label="品牌名称"
        width="width" 
        prop="tmName">
      </el-table-column>
      <el-table-column
        label="品牌logo"
        width="width" 
        prop="logoURL">
        <!-- 当要改变列表的结构时，加一个作用域插槽 -->
        <template slot-scope="{row, $index}">
          <img :src="row.logoURL" alt="" style="width:100px; height:80px">
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="width" 
        prop="">
        <template slot-scope="{row, $index}" >
          <el-button type="warning" icon="el-icon-edit" size="small" @click="showUpdataDialog(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-edit" size="small" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
    class="rowClassName"
    style="text-align:center"
    background=""
    :current-page.sync="page"
    :page-sizes="[1,2,3,4,5]"
    :page-size.sync="pagesize" 
    layout="prev, pager, next, jumper,->, sizes, total"
    :total="total">
    </el-pagination>

    <!-- 添加和修改的对话框 -->
    <el-dialog :title="tmForm.id ? '修改品牌': '添加品牌' " :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" style="width:80%" ref="myform" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="on"></el-input>
        </el-form-item> 
        <el-form-item label-width="100px" label="头像" prop="logoURL">
            <el-upload
              class="avatar-uploader"
              action="/dev-api/admin/product/uploadAvatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="tmForm.logoURL" :src="tmForm.logoURL" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdata()">确 定</el-button>
      </div>
    </el-dialog>
    <template>
</template>
  </div>
</template>

<script>
export default {
  name:'TradeMark',
  data(){
    return {
      // 定义分页数据
      page:1,
      limit:3,
      total:0,
      pagesize:3,
      ids: [],
      start(){
        return (this.page-1) * this.pagesize;
      },
      end(){
        return this.start() + this.pagesize;
      },
      // 拿到的列表数据
      trademarkList:[],
      dialogFormVisible:false,
      // 弹窗表单数据
      tmForm:{
        tmName:'',
        logoURL:''
      },
      imageUrl: '',
      rules:{
        tmName: {required: true, message:'品牌名称不能为空'},
        logoURL: {required: true, message:'品牌logo不能为空'}
      }
    }
    
  },
  mounted(){
    this.getTrademarkList()
  },
  methods:{
    async getTrademarkList(){
      const result = await this.$API.trademark.getPageList(this.page,this.limit)    
      
      console.log('nodejs返回的',result);
      if(result.code === 200){
        this.trademarkList = result.data.records;
        this.total = result.data.total
      }
      
    },
    rowClassName({rowIndex}){
      return rowIndex >= this.start() && rowIndex < this.end()?'visible':'hidden';
    },
    /* seletionChange( data ){
      this.ids = data.map(item => item.id).slice(this.start(), this.end())
    }, */
    handleAvatarSuccess(res, file) {
    // 将后端传来的图片地址保存
      // this.imageUrl = URL.createObjectURL(file.raw); //这家伙花了我好多时间
      console.log('后端传来的图片地址',res.data);
      this.imageUrl = res.data
      this.tmForm.logoURL = res.data

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    showUpdataDialog(row){
      this.dialogFormVisible = true
      console.log(row);
      // this.tmForm = row;
      this.tmForm = {
        ...row
      }

        // 拷贝，深拷贝和浅拷贝 
        //拷贝必然出现新的地址，新的空间，也就是说有不同的数据存储位置
        //深拷贝和浅拷贝
        // 谈的其实是拷贝的东西是什么
        // 如果拷贝的是地址，那就是浅拷贝
        // row里面的都是基本数据，不谈深浅拷贝
        // 深拷贝是针对对象数据类型出现的
        // 基本数据类型不存在深浅拷贝

      },
    add(){
      this.dialogFormVisible = true
      // 点击添加按钮后就重新清空表单，并不给id，用户之后的修改或者上传的区分
      this.tmForm  = {
        tmName:'',
        logoURL:''
      }
      console.log(this.tmForm);
    },
    del(row) {
        this.$confirm(`您确定要删除${row.tmName}吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          // 发请求
          const result =  await this.$API.trademark.delete(row._id)
          console.log(result);
          if(result.code === 200){
            this.$message.success(result.message);
            this.getTrademarkList()
          }else{
            this.$message.error('删除失败')
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addOrUpdata(){
        this.$refs.myform.validate( async (valid) => {
          if (valid) {
            // console.log('开始提交');
            console.log('提交前的表单',this.tmForm);
            const result =  await this.$API.trademark.addOrUpdata(this.tmForm)
            if(result.code === 200){
              this.$message.success(result.message)
              this.dialogFormVisible = false
              // 重新渲染页面
              this.getTrademarkList()
            }else{
              this.$message.success('很抱歉，修改失败~')
            }
          } else {
            this.$message('请输入完整信息')
            return false;
          }
        });
      }
  }
}
</script>

<style lang="scss" scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>