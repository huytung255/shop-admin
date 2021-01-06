const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');
const { promoDetail } = require('../controllers/promoController');

exports.promoList = async (page) => {
    collection = await db().collection('PROMO');
    promoList = collection.find().limit(10).skip(10 * (page - 1)).toArray();
    return promoList;
}

exports.count = async () => {
    let collection;
    collection = await db().collection('PROMO');
    count = await collection.countDocuments({});
    return count;
}

exports.createPromo = async (info) => {
    var inputData= { TITLE : info.title, CONTENT : info.content, IMAGE: info.cover};
    console.log("Document them vao: ", inputData);
    db().collection('PROMO').insertOne(inputData, function(err,res){
        if (err) throw err;
        console.log("1 document inserted");
    });
}

exports.promoDetail = async (id) => {
    collection = await db().collection('PROMO');
    detail = await collection.findOne({ _id: ObjectId(id) });
    return detail;
}

exports.promoEdit = async (fields, id) => {
    var myquery = { _id: ObjectId(id) };
    var updateData = { $set: { TITLE: fields.title, CONTENT: fields.content, IMAGE: fields.cover } };
    await db().collection('PROMO').updateOne(myquery,updateData, { upsert: true });
}

exports.promoToggle = async (id,toggle) => { 
    var myquery = { _id: ObjectId(id) };
    var updateData = { $set: { ACTIVE :  toggle} };
    console.log('toggleee',toggle);
    await db().collection('PROMO').updateOne(myquery,updateData, { upsert: true });
}