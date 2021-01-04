const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.admin = async(adminid) => {
    const adminCollection = await db().collection('ADMIN');
    const admin = await adminCollection.findOne({_id: ObjectId(adminid)});
    return admin;
}

exports.update = async (req) =>{
    const updateDocument = {
        $set: {
           USERNAME: req.body.username,
           ADMIN_NAME: req.body.name,
           ADMIN_EMAIL: req.body.email,
           ADMIN_PHONE: req.body.phone,
           ADMIN_ADDRESS: req.body.address,
        },
     };
     const collection = await db().collection('ADMIN');
     const result = await collection.updateOne({}, updateDocument);
}

exports.findOne = async(user)=>{
    const ans =  await db().collection('ADMIN').findOne(user);
    return ans;
}