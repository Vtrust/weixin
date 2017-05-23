var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/weixin';


var insertData = function(data, db, callback) {
    //连接到表 site
    //
    var userCollection = db.collection('User');


    userCollection.find({}).toArray(function (err, items) {

        if (!err) {
            // opts.success(items);
            var obj = {
            };

            for (var i = 0, len = items.length; i < len; i++) {
                var entrytime = items[i]['entrytime'];
                entrytime = !!entrytime ? entrytime.slice(0, 4) : '';

                if (!!entrytime) {
                    if (!obj[entrytime]) {
                        obj[entrytime] = 1;
                    }
                    else {
                        obj[entrytime] ++ ;
                    }
                }

            }
            console.log(obj);
            var data = [{key: 'entryCount', data: obj}];

            var collection = db.collection('Annual');

            //插入数据
            collection.insert(data, function(err, result) {
                if(err) {
                    console.log('Error:'+ err);
                }
                else {
                    console.log(result);
                }
            });
        }
        else {
            console.log(err);
        }

    });

}


MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    console.log('开始' + new Date().getTime());

    insertData([], db, function(result) {
        console.log('数据写完' + new Date().getTime());
        db.close();
    });
});