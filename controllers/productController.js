const productModel = require('../models/model');
//import list from '../model/productModel';

exports.productlist = async (req, res, next)=>{
    const drinks = await productModel.drinks();
    const foods = await productModel.foods();
    const desserts= await productModel.desserts();
    //Pass data to view to display list of product
    res.render('products/productlist', {foods, drinks, desserts});
}
exports.addnew = async (req, res, next)=>{
    res.render('products/addnew',{});
}
exports.create = async (req, res, next)=>{
    const {db} = require('../dal/db');
    var inputData= { title: req.body.title, cover: req.body.cover, basePrice: req.body.basePrice, description: req.body.description, review: "" };
    if (req.body.category == "Foods"){
        db().collection('foods').insertOne(inputData, function(err,res){
            if (err) throw err;
            console.log("1 document inserted");
        });
    }
    if (req.body.category == "Drinks"){
        db().collection('drinks').insertOne(inputData, function(err,res){
            if (err) throw err;
            console.log("1 document inserted");
        });
    }
    if (req.body.category == "Desserts"){
        db().collection('desserts').insertOne(inputData, function(err,res){
            if (err) throw err;
            console.log("1 document inserted");
        });
    }
    res.redirect('/products');
}
exports.edit= async(req, res, next)=>{
    const {db} = require('../dal/db');
    const { ObjectId} = require('mongodb');
    var myquery = { _id: ObjectId(req.params.id) };
    var updateData= {$set: { title: req.body.title, cover: req.body.cover, basePrice: req.body.basePrice, description: req.body.description, review: "" }};
    console.log(updateData);
    if (req.body.category == "Foods"){
        db().collection('foods').updateOne(myquery,updateData, { upsert: true });
    }
    if (req.body.category == "Drinks"){
        db().collection('drinks').updateOne(myquery,updateData, { upsert: true });
    }
    if (req.body.category == "Desserts"){
        db().collection('desserts').updateOne(myquery,updateData, { upsert: true });
    }
    res.redirect('/products');
}
exports.detail = async(req, res, next)=>{
    let type = req.params.type;
    let productId = req.params.id;

    //Pass data to view to display list of product

    if(type =="foods"){
        const product = await productModel.food(productId);
        res.render('products/detail', {product,type});
    }
    //drinks
    if(type =="drinks"){
        const product = await productModel.drink(productId);
        res.render('products/detail', {product,type});
    }
    //dessert
    if(type =="desserts"){
        const product = await productModel.dessert(productId);
        res.render('products/detail', {product,type});
    }

}

exports.delete = async (req, res, next)=>{
    const query = req.body.title;
    const type = req.body.type;
    const result = await productModel.deleteOnebyType(query, type);
    if (result === 1) {
    console.dir("Successfully deleted one document.");

    let drinks = await productModel.drinks();
    let foods = await productModel.foods();
    let desserts= await productModel.desserts();
    res.render('products/productlist', {foods, drinks, desserts}); 
    } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            }       
}

