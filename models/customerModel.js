const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

//Export all products & pagination
exports.customers = async(page) => {
    const usersCollection = await db().collection('CUSTOMER');
    const customers = await usersCollection.find().limit(10).skip(10 * (page - 1)).toArray();
   return customers;
}
//Export 1 customer by id
exports.customer = async(customerId) => {
    const customersCollection = await db().collection('CUSTOMER');
    const customer = await customersCollection.findOne({_id: ObjectId(customerId)});
    return customer;
}

exports.count = async() => {
    let collection;
    collection = await db().collection('CUSTOMER');
    count = await collection.countDocuments({});
    return count;
}

exports.lock = async(customerID)=>{
    const filter = { _id: ObjectId(customerID) };
// update the value of the 'z' field to 42
const updateDocument = {
   $set: {
      IS_LOCK: true,
   },
};
const collection = await db().collection('CUSTOMER');
const result = await collection.updateOne(filter, updateDocument);
}

exports.unlock = async(customerID)=>{
    const filter = { _id: ObjectId(customerID) };
// update the value of the 'z' field to 42
const updateDocument = {
   $set: {
      IS_LOCK: false,
   },
};
const collection = await db().collection('CUSTOMER');
const result = await collection.updateOne(filter, updateDocument);
}

exports.search = async (page, name) => {
    const customersCollection = await db().collection('CUSTOMER');
    var customers = await customersCollection.find({ 'CUS_NAME': name }).limit(10).skip(10 * (page - 1)).toArray();
    return customers;
}

exports.countByTitle = async (name) => {
    collection = await db().collection('CUSTOMER');
    customers_by_name = await collection.find({ 'CUS_NAME': name }).toArray();
    count = customers_by_name.length;
    return count;
}