// var MongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/product")

const mg = mongoose.connection.once('open',function(){
	console.log('连接数据库成功！');
})

/* mongoose.disconnect(function(){
	console.log('数据库关闭成功！');
})
 */

// // 设置模型
// var userInfoSchema = new mongoose.Schema({
// 	tmName:String,
// 	logoUrl:String
// })

// // 有了model我们就可以对collection进行增删改查
// var UserInfoModel = mg.model('user_info',userInfoSchema);

// 创建user_Info表 
/* UserInfoModel.create([
  {tmName:'测试一',logoURL:'dsadasdsd'},
  {tmName:'测试二',logoURL:'dsadsdasdsds'}
],function(){
  console.log('插入成功！');
}) */

/* UserInfoModel.find({tmName:'测试一'},function(err, data){
	console.log(data);	
}) */

/* UserInfoModel.updateOneby(
    [
      {"_id":new ObjectId('62ddf15738696c12b788136e')},
      {$set:{tmName:'啦啦啦',logoURL:'dsdasdasd'}}
    ],function(err){
      console.log('修改成功！');
    }
  ) */
	/* UserInfoModel.insertOne({
		tmName:'测试insert',
		logoURL:'lalalala'
	},function(){
		console.log('插入成功！');
	}) */

	/* UserInfoModel.deleteOne({tmName:'测试二'},function(err){
		if(!err){
			console.log('删除成功');
		}
	}) */



/* console.log(client);

const dbName = 'product';

let db = client.db(dbName); */
module.exports = mg
