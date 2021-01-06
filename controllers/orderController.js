const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const { all } = require('../routes/order');

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
    if(req.user.type == "admin"){
        res.render('order/detail', {order});}
    else if(req.user.type == "staff"){
        res.render('order/detail', {layout: 'layoutstaff', order});
    }
    
}

exports.orderHistory = async(req, res, next)=>{
    const allorders = await orderModel.pendingorders();
    await allorders.sort((a,b)=>{
        if(a.DATECREATED > b.DATECREATED){
            return 1;
        }
        if(a.DATECREATED < b.DATECREATED){
            return -1;
        }
    });
    res.render('order/orderliststaffview', {layout: 'layoutstaff', allorders: allorders});
}
exports.myconfirmorders = async(req, res, next)=>{
    const allorders = await orderModel.myconfirmedorders(req.user._id);
    await allorders.sort((a,b)=>{
        if(a.DATECREATED > b.DATECREATED){
            return -1;
        }
        if(a.DATECREATED < b.DATECREATED){
            return 1;
        }
    });
    res.render('order/orderliststaffview', {layout: 'layoutstaff', allorders: allorders});
}
exports.updateStateOrder = async (req, res, next) => {
    const orderid = req.params.id;
    const staffid = req.user._id;
    const status = parseInt(req.params.value);
    const state = await orderModel.updateState(orderid, staffid, status);
    res.redirect('/order/staffview');
}