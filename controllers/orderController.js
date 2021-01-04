const orderModel = require('../models/orderModel');

exports.orderList = async (req,res,next) => {
    const page = +req.query.page || 1;
    orders = await orderModel.orderList(page);
    count = await orderModel.count();
    res.render('order/orderlist', {pagination: { page: parseInt(page), limit:10, totalRows: count}, orders});
}

exports.orderListByStatus = async (req,res,next) => {
    const page = +req.query.page || 1;
    status = parseInt(req.query.status);
    orders = await orderModel.orderListByStatus(page,status);
    console.log('ordersss',orders);
    count = await orderModel.countByStatus(status);
    res.render('order/orderlist', {pagination: { page: parseInt(page), limit:10, totalRows: count,  queryParams: {status: status}}, orders});
}

exports.orderDetail = async (req,res,next) => {
    id = req.query.id;
    order = await orderModel.orderDetail(id);
    res.render('order/detail', {order});
}