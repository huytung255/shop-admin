//connect with database
const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

//exports foods
exports.foods = async () => {
    console.log('Foods Collection');
    const foodsCollection = await db().collection('foods');
    const foods = await foodsCollection.find({}).toArray();
    console.dir(foods);
    return foods;
}
//exports drinks
exports.drinks = async()=>{
    console.log('Drinks Collection');
    const drinksCollection = await db().collection('drinks');
    const drinks = await drinksCollection.find({}).toArray();
    console.log(drinks);

    return drinks;
}

//exports desserts
exports.desserts = async()=>{
    console.log('Drinks Collection');
    const dessertsCollection = await db().collection('desserts');
    const desserts = await dessertsCollection.find({}).toArray();
    console.log(desserts);

    return desserts;
}

//Exports a food by id
exports.food = async(productId)=>{
    console.log('Food detail');
    console.log(productId);
    const foodsCollection = await db().collection('foods');
    const food = await foodsCollection.findOne({_id: ObjectId(productId)});
    console.log(food);
    return food;
}

//exports a drink by id
exports.drink= async(productId)=>{
    console.log('Drink detail');
    const drinksCollection = await db().collection('drinks');
    const drink = await drinksCollection.findOne({_id: ObjectId(productId)});
    return drink;
}
//exports a dessert by id
exports.dessert = async(productId)=>{
    console.log('Dessert detail');
    const dessertsCollection = await db().collection('desserts');
    const dessert = await dessertsCollection.findOne({_id: ObjectId(productId)});
    return dessert;
}

exports.deleteOne = async(querytitle)=>{
    let collection;
    collection = await db().collection('products');
    const query = { title: querytitle};
    const result = await collection.deleteOne(query);
    return result.deletedCount;
}
//Export all products & pagination
exports.products = async(page) => {
    const productsCollection = await db().collection('products');
    var products = await productsCollection.find().limit(10).skip(10 * (page - 1)).toArray();
   return products;
}
//Export 1 product by id
exports.product = async(productId) => {
    const productsCollection = await db().collection('products');
    const product = await productsCollection.findOne({_id: ObjectId(productId)});
    return product;
}
exports.create = async(req) => {
    var inputData= { title: req.body.title, category: req.body.category, cover: req.body.cover, basePrice: parseInt(req.body.basePrice), description: req.body.description, review: "" };
    db().collection('products').insertOne(inputData, function(err,res){
        if (err) throw err;
        console.log("1 document inserted");
    });
}

exports.edit = async(req) => {
    var myquery = { _id: ObjectId(req.params.id) };
    var updateData= {$set: { title: req.body.title, category: req.body.category, cover: req.body.cover, basePrice: parseInt(req.body.basePrice), description: req.body.description, review: "" }};
    db().collection('products').updateOne(myquery,updateData, { upsert: true });
}

exports.count = async() => {
    let collection;
    collection = await db().collection('products');
    count = await collection.countDocuments({});
    return count;
}
exports.countByCategory = async(category) => {
    collection = await db().collection('products');
    // count = await collection.countDocuments({ $where: {"category" : category}});
    products_by_category = await collection.find({"category" : category}).toArray();
    count = products_by_category.length;
    return count;
}

exports.search = async(title) => {
    const productsCollection = await db().collection('products');
    var products = await productsCollection.find({"title" : title}).toArray();
    console.log(products);
   return products;
} 
exports.category = async(page,category) => {
    const productsCollection = await db().collection('products');
    var products = await productsCollection.find({"category" : category}).limit(10).skip(10 * (page - 1)).toArray();
   return products;
} 
//What is betweeen modules.exports and exports.abc and exports
//Imports and require
