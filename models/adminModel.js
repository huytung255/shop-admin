const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.admin = async() => {
    const adminCollection = await db().collection('ADMIN');
    const admin = await adminCollection.findOne();
    return admin;
}

exports.update = async (req) =>{
    const updateDocument = {
        $set: {
           USERNAME: req.body.username,
           NAME: req.body.name,
           EMAIL: req.body.email,
           PHONE: req.body.phone,
           ADDRESS: req.body.address,
        },
     };
     const collection = await db().collection('ADMIN');
     const result = await collection.updateOne({}, updateDocument);
}
