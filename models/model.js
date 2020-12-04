//connect with database
const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');
// //Exports all 
// exports.list = async () => {
//     console.log('model db');
//     const booksCollection = await db().collection('foods');
//     const books = await booksCollection.find({}).toArray();
//     console.dir(books);
    
//     return books[0];
// }

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
exports.food = async(productName)=>{
    console.log('Food detail');
    const foodsCollection = await db().collection('foods');
    const food = await foodsCollection.findOne({title: productName});
    return food;
}

//exports a drink by id
exports.drink= async(productName)=>{
    console.log('Food detail');
    const drinksCollection = await db().collection('drinks');
    const drink = await drinksCollection.findOne({title: productName});
    return drink;
}
//exports a dessert by id
exports.dessert = async(productName)=>{
    console.log('Food detail');
    const dessertsCollection = await db().collection('desserts');
    const dessert = await dessertsCollection.findOne({title: productName});
    return dessert;
}


//What is betweeen modules.exports and exports.abc and exports
//Imports and require