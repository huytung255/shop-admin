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
    var drinks = await productModel.drinks();
    var foods = await productModel.foods();
    var desserts= await productModel.desserts();
    res.render('products/productlist', {foods, drinks, desserts});
}

exports.detail = async(req, res, next)=>{
    let type = req.params.type;
    let productName = req.params.product;

    const drinks = await productModel.drinks();
    const foods = await productModel.foods();
    const desserts= await productModel.desserts();
    //Pass data to view to display list of product

    if(type =="foods"){
        const product = await productModel.food(productName);
        res.render('product/detailFood', {product,foods, desserts});
    }
    //drinks
    if(type =="drinks"){
        const product = await productModel.drink(productName);
        res.render('product/detailDrink', {product,drinks, desserts});
    }
    //dessert
    if(type =="desserts"){
        const product = await productModel.dessert(productName);
        res.render('product/detailDessert', {product,foods, desserts});
    }

}


