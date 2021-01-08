const customerModel = require('../models/customerModel');

exports.customerlist = async (req, res, next)=>{
    const page = +req.query.page || 1;
    const customers = await customerModel.customers(page);
    count = await customerModel.count();
    console.log(customers);
    //Pass data to view to display list of product
    res.render('customer/customerlist', {pagination: { page: parseInt(page), limit:10, totalRows: count}, customers});
}

exports.detail = async(req, res, next)=>{
    let customerId = req.params.id;
    //Pass data to view to display list of product
    const customer = await customerModel.customer(customerId);
    console.log(customer);
    res.render('customer/information', {customer});
}

exports.lock = async(req, res, next)=>{
    const customerID = req.params.id;    
    await customerModel.lock(customerID);
    res.redirect('/customer/detail/'+customerID);
}

exports.unlock = async(req, res, next)=>{
    const customerID = req.params.id;
    await customerModel.unlock(customerID);
    res.redirect('/customer/detail/'+customerID);
}

exports.search = async (req, res, next) => {

    const page = +req.query.page || 1;
    const title = req.query.searchedcustomer;
    const customers = await customerModel.search(page, title);
    const count = await customerModel.countByTitle(title);
    res.render('customer/customerlist', { pagination: { page: parseInt(page), limit: 10, totalRows: count, queryParams: { searchedcustomer: title } }, customers });

}