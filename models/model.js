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

exports.deleteOnebyType = async(querytitle, type)=>{
    let collection;
    if(type=='foods')
    {
        collection = await db().collection('foods');
    }
    else if(type == 'drinks')
    {
        collection = await db().collection('drinks');
    }
    else if(type == 'desserts')
    {
        collection = await db().collection('desserts');
    }
    const query = { title: querytitle};
    const result = await collection.deleteOne(query);
    return result.deletedCount;
}


//What is betweeen modules.exports and exports.abc and exports
//Imports and require
