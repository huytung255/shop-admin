//connect with database
const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.deleteOne = async(id)=>{
    let collection;
    collection = await db().collection('DISH');
    const query = { _id : ObjectId(id)};
    const result = await collection.deleteOne(query);
    return result.deletedCount;
}
//Export all products & pagination
exports.products = async(page) => {
    const productsCollection = await db().collection('DISH');
    var products = await productsCollection.find().limit(10).skip(10 * (page - 1)).toArray();
   return products;
}
//Export 1 product by id
exports.product = async(productId) => {
    const productsCollection = await db().collection('DISH');
    const product = await productsCollection.findOne({_id: ObjectId(productId)});
    return product;
}

exports.create = async(req) => {
    var inputData= { DISH_NAME : req.name, PRICE: parseInt(req.price), STATUS: 1, TYPE : req.type, DESCRIPTION: req.description, VIEW: 0, IMAGES: [req.url0, req.url1, req.url2]};
    console.log("Document them vao: ", inputData);
    db().collection('DISH').insertOne(inputData, function(err,res){
        if (err) throw err;
        console.log("1 document inserted");
    });
}

exports.edit = async(req) => {
    var myquery = { _id: ObjectId(req.query.id) };
    var updateData= {$set: { DISH_NAME: req.body.title, PRICE: parseInt(req.body.basePrice), STATUS: parseInt(req.body.status), TYPE: req.body.category, DESCRIPTION: req.body.description , IMAGES: [req.body.url0, req.body.url1, req.body.url2]}};
    db().collection('DISH').updateOne(myquery,updateData, { upsert: true });
}

exports.count = async() => {
    let collection;
    collection = await db().collection('DISH');
    count = await collection.countDocuments({});
    return count;
}
exports.countByTitle = async(name) => {
    collection = await db().collection('DISH');
    products_by_name = await collection.find({'DISH_NAME' : name}).toArray();
    count = products_by_name.length;
    return count;
}
exports.countByType = async(type) => {
    collection = await db().collection('DISH');
    products_by_type = await collection.find({'TYPE': type}).toArray();
    count = products_by_type.length;
    return count;
}

exports.search = async(page,name) => {
    const productsCollection = await db().collection('DISH');
    var products = await productsCollection.find({'DISH_NAME' : name}).limit(10).skip(10 * (page - 1)).toArray();
   return products;
} 
exports.type = async(page,type) => {
    const productsCollection = await db().collection('DISH');
    var products = await productsCollection.find({"TYPE" : type}).limit(10).skip(10 * (page - 1)).toArray();
   return products;
} 
//What is betweeen modules.exports and exports.abc and exports
//Imports and require
