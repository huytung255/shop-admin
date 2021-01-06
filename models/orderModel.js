const { db } = require('../dal/db');
const { ObjectId } = require('mongodb');
const customerModel = require('../models/customerModel');
const staffModel = require('../models/staffModel');
const productModel = require('../models/productModel');
exports.orderList = async (page) => {
    res = [];
    orderCollection = await db().collection('ORDER');
    allOrders = await orderCollection.find().limit(10).skip(10 * (page - 1)).toArray();
    for (i in allOrders) {
        customer = await customerModel.customer(allOrders[i].CUS_ID);
        staff = await staffModel.staff(allOrders[i].STAFF_ID);
        staffName = staff ? staff.STAFF_NAME : null;
        cusName = customer ? customer.CUS_NAME : null;
        temp = {
            order : allOrders[i],
            creator : cusName,
            staff : staffName
        }
        res.push(temp);
    }
    return res;
}
exports.orderListByStatus = async (page, status) => {
    res = [];
    orderCollection = await db().collection('ORDER');
    allOrdersByStatus = await orderCollection.find({ STATUS: status }).limit(10).skip(10 * (page - 1)).toArray();
    for (i in allOrdersByStatus) {
        customer = await customerModel.customer(allOrdersByStatus[i].CUS_ID);
        staff = await staffModel.staff(allOrdersByStatus[i].STAFF_ID);
        staffName = staff ? staff.STAFF_NAME : null;
        cusName = customer ? customer.CUS_NAME : null;
        temp = {
            order : allOrdersByStatus[i],
            creator : cusName,
            staff : staffName
        }
        res.push(temp);
    }
    return res;
}


exports.orderDetail = async (id) => {
    orderCollection = await db().collection('ORDER');
    order = await orderCollection.findOne({ _id: ObjectId(id) });
    detailCollection = await db().collection('ORDER_DETAIL');
    items = [];
    detail = await detailCollection.find({ "ORDER_ID": ObjectId(id) }).toArray();
    for (i in detail) {
        temp = {
            item: await productModel.product(detail[i].DISH_ID),
            itemDetail: detail[i]
        }
        items.push(temp);
    }
    customer = await customerModel.customer(order.CUS_ID);
    staff = await staffModel.staff(order.STAFF_ID);
    const STAFF_NAME = staff ? staff.STAFF_NAME : null;
    res = {
        order: order,
        creator: customer,
        staff: STAFF_NAME,
        items: items
    }
    return res;
}

exports.count = async () => {
    let collection;
    collection = await db().collection('ORDER');
    count = await collection.countDocuments({});
    return count;
}
exports.countByStatus = async (status) => {
    let collection;
    collection = await db().collection('ORDER');
    count = await collection.countDocuments({ STATUS: status });
    return count;
}

exports.findOrders = async (userId) => {
    return await db().collection('ORDER').find({ CUS_ID: new ObjectId(userId) }).toArray();
}

exports.findOrderDetail = async (orderId) => {
    return await db().collection('ORDER_DETAIL').find({ ORDER_ID: new ObjectId(orderId) }).toArray();
}

exports.pendingorders = async () => {

    const cursor = await db().collection('ORDER').aggregate([
        {
            $match:
                { STATUS: 0 }
        },
        {
            $lookup:
            {
                from: 'ORDER_DETAIL',
                localField: '_id',
                foreignField: 'ORDER_ID',
                as: 'ALLDISHES'
            },

        },
        {
            $project:
            {
                _id: 1,
                TOTAL: 1,
                DATECREATED: 1,
                STATUS: 1,
                "ALLDISHES.SUBTOTAL": 1,
                "ALLDISHES.DISH_ID": 1,
                "ALLDISHES.QUANTITY": 1,
            }
        },
        {
            $lookup:
            {
                from: 'DISH',
                localField: 'ALLDISHES.DISH_ID',
                foreignField: '_id',
                as: 'DISHDETAIL'
            }
        },
        {
            $project:
            {
                _id: 1,
                TOTAL: 1,
                DATECREATED: 1,
                STATUS: 1,
                "ALLDISHES.SUBTOTAL": 1,
                "ALLDISHES.DISH_ID": 1,
                "ALLDISHES.QUANTITY": 1,
                "DISHDETAIL._id": 1,
                "DISHDETAIL.DISH_NAME": 1,
                "DISHDETAIL.IMAGES": 1
            }
        }
    ])
    let result = await cursor.toArray();
    result.forEach(element => {
        console.log(element, '\n');
        //aldishe
        let allDish = element.ALLDISHES;
        let dishDetail = element.DISHDETAIL;
        console.log("ALL DISH: ", allDish);
        console.log("Dish detail: ", dishDetail);
        allDish.forEach(dish => {
            const detaildish = dishDetail.find(detail => {
                if (detail._id.toString() == dish.DISH_ID.toString()) {
                    return true;
                };
            });
            if (detaildish.IMAGES != undefined) {
                dish.cover_image = detaildish.IMAGES[0];
                console.log("Detail moi mon: ", dish);
            }
        })
        console.log("moi element: ", element, '\n');
    });

    console.log("result final: ", result);
    return result;
}

exports.myconfirmedorders = async (id) => {

    const cursor = await db().collection('ORDER').aggregate([
        {
            $match:
                { STAFF_ID: ObjectId(id) }
        },
        {
            $lookup:
            {
                from: 'ORDER_DETAIL',
                localField: '_id',
                foreignField: 'ORDER_ID',
                as: 'ALLDISHES'
            },

        },
        {
            $project:
            {
                _id: 1,
                TOTAL: 1,
                DATECREATED: 1,
                STATUS: 1,
                "ALLDISHES.SUBTOTAL": 1,
                "ALLDISHES.DISH_ID": 1,
                "ALLDISHES.QUANTITY": 1,
            }
        },
        {
            $lookup:
            {
                from: 'DISH',
                localField: 'ALLDISHES.DISH_ID',
                foreignField: '_id',
                as: 'DISHDETAIL'
            }
        },
        {
            $project:
            {
                _id: 1,
                TOTAL: 1,
                DATECREATED: 1,
                STATUS: 1,
                "ALLDISHES.SUBTOTAL": 1,
                "ALLDISHES.DISH_ID": 1,
                "ALLDISHES.QUANTITY": 1,
                "DISHDETAIL._id": 1,
                "DISHDETAIL.DISH_NAME": 1,
                "DISHDETAIL.IMAGES": 1
            }
        }
    ])
    let result = await cursor.toArray();
    result.forEach(element => {
        console.log(element, '\n');
        //aldishe
        let allDish = element.ALLDISHES;
        let dishDetail = element.DISHDETAIL;
        console.log("ALL DISH: ", allDish);
        console.log("Dish detail: ", dishDetail);
        allDish.forEach(dish => {
            const detaildish = dishDetail.find(detail => {
                if (detail._id.toString() == dish.DISH_ID.toString()) {
                    return true;
                };
            });
            if (detaildish.IMAGES != undefined) {
                dish.cover_image = detaildish.IMAGES[0];
                console.log("Detail moi mon: ", dish);
            }
        })
        console.log("moi element: ", element, '\n');
    });

    console.log("result final: ", result);
    return result;
}

exports.updateState = async (orderid, staffid, status) => {
    const filter = { _id: ObjectId(orderid) };
    // update the value of the 'z' field to 42
    const updateDocument = {
        $set: {
            STAFF_ID: ObjectId(staffid),
            STATUS: status
        },
    };
    const collection = await db().collection('ORDER');
    const result = await collection.updateOne(filter, updateDocument, { upsert: true });
}