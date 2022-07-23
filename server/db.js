var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://127.0.0.1:27017/product";	// 连接的url

const dbName = 'product';
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect(err => {
	if(err){
		console.log(err);
		return
	}
	console.log('连接数据库成功！');

	
	/* db.collection("user_info").insertMany(
		[
			{
				"tmName":"苹果",
				"logoURL":"https://upload.wikimedia.org/wikipedia/zh/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
			  },
			  {
				"tmName":"华为",
				"logoURL":"https://upload.wikimedia.org/wikipedia/zh/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
			  },
			  {
				"tmName":"小米",
				"logoURL":"https://upload.wikimedia.org/wikipedia/zh/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png"
			  }
		]
	) */

	/* db.collection('user_info').deleteOne({ 'name': '2222' }, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('删除一条数据成功');
        client.close();
    }) */
	

	
})

let db = client.db(dbName);
/* db.collection('user_info').find({}).toArray((err, data) => {
		console.log(data);
        // 操作数据库完成以后要关闭数据库连接
        client.close();
    }) */
module.exports = db
