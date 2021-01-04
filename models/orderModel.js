const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');
const customerModel = require('../models/customerModel');
const staffModel = require('../models/staffModel');
const productModel = require('../models/productModel');
exports.orderList = async(page) => {
    res =[];
    orderCollection = await db().collection('ORDER');
    allOrders= await orderCollection.find().limit(10).skip(10 * (page - 1)).toArray();
    for (i in allOrders) {
        customer = await customerModel.customer(allOrders[i].CUS_ID);
        console.log('customer',allOrders[i].CUS_ID);
        staff = await staffModel.staff(allOrders[i].STAFF_ID);
        temp = {
            order : allOrders[i],
            creator : customer.CUS_NAME,
            staff : staff.STAFF_NAME
        }
        res.push(temp);
    }
    return res;
}
exports.orderListByStatus = async(page,status) => {
    res =[];
    orderCollection = await db().collection('ORDER');
    allOrdersByStatus= await orderCollection.find({STATUS : status}).limit(10).skip(10 * (page - 1)).toArray();
    for (i in allOrdersByStatus) {
        customer = await customerModel.customer(allOrdersByStatus[i].CUS_ID);
        staff = await staffModel.staff(allOrdersByStatus[i].STAFF_ID);
        temp = {
            order : allOrdersByStatus[i],
            creator : customer.CUS_NAME,
            staff : staff.STAFF_NAME
        }
        res.push(temp);
    }
    return res;
}


exports.orderDetail =async(id) =>{
    orderCollection = await db().collection('ORDER');
    order = await orderCollection.findOne({_id: ObjectId(id)});
    detailCollection = await db().collection('ORDER_DETAIL');
    items = [];
    detail = await detailCollection.find({"ORDER_ID": id}).toArray();
    for (i in detail) {
        temp ={
            item : await productModel.product(detail[i].DISH_ID),
            itemDetail : detail[i]
        }
        items.push(temp);
    }
    customer = await customerModel.customer(order.CUS_ID);
    staff = await staffModel.staff(order.STAFF_ID);
    res ={
        order : order,
        creator : customer,
        staff : staff.STAFF_NAME,
        items : items
    }
    return res;
}

exports.count = async() => {
    let collection;
    collection = await db().collection('ORDER');
    count = await collection.countDocuments({});
    return count;
}
exports.countByStatus = async(status) => {
    let collection;
    collection = await db().collection('ORDER');
    count = await collection.countDocuments({STATUS : status});
    return count;
}