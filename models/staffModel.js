const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

//Export all products & pagination
exports.staffs = async(page) => {
    const staffsCollection = await db().collection('STAFF');
    const staffs = await staffsCollection.find().limit(10).skip(10 * (page - 1)).toArray();
   return staffs;
}
//Export 1 staff by id
exports.staff = async(staffId) => {
    if(staffId==""){
        return {};
    }
    const staffsCollection = await db().collection('STAFF');
    const staff = await staffsCollection.findOne({_id: ObjectId(staffId)});
    return staff;
}

exports.count = async() => {
    let collection;
    collection = await db().collection('STAFF');
    count = await collection.countDocuments({});
    return count;
}

exports.create = async(req)=>{
    const document= {USERNAME: req.body.username, STAFF_NAME: req.body.name, STAFF_EMAIL: req.body.email, PASSWORD: req.body.password,STAFF_ADDRESS: req.body.address, STAFF_PHONE: req.body.phone};
    console.log("Document them vao: ", document);
    await db().collection('STAFF').insertOne(document, function(err,res){
        if (err) throw err;
        console.log("1 document inserted");
    });
}

exports.deleteOne = async(queryID)=>{
    const collection = await db().collection('STAFF');
    const query = { _id: ObjectId(queryID)};
    const result = await collection.deleteOne(query);
    return result.deletedCount;
}

exports.findOne = async(user)=>{
    const ans =  await db().collection('STAFF').findOne(user);
    return ans;
}

exports.update = async(req)=>{
    const updateDocument = {
        $set: {
           USERNAME: req.body.username,
           STAFF_NAME: req.body.name,
           STAFF_PHONE: req.body.phone,
           STAFF_ADDRESS: req.body.address,
        },
     };
     const collection = await db().collection('STAFF');
     const result = await collection.updateOne({STAFF_EMAIL: req.user.STAFF_EMAIL}, updateDocument);
}

exports.changepw = async(id, password) =>{
    const updateDocument = {
        $set: {
           PASSWORD: password
        },
     };
     const collection = await db().collection('STAFF');
     const result = await collection.updateOne({_id: ObjectId(id)}, updateDocument);
}

exports.search = async (page, name) => {
    const customersCollection = await db().collection('STAFF');
    var customers = await customersCollection.find({ 'STAFF_NAME': name }).limit(10).skip(10 * (page - 1)).toArray();
    return customers;
}

exports.countByTitle = async (name) => {
    collection = await db().collection('STAFF');
    staffs_by_name = await collection.find({ 'STAFF_NAME': name }).toArray();
    count = staffs_by_name.length;
    return count;
}