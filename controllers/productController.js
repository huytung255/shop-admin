const productModel = require('../models/productModel');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
//import list from '../model/productModel';

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});

exports.productlist = async (req, res, next) => {
    const page = +req.query.page || 1;
    const products = await productModel.products(page);
    count = await productModel.count();
    //Pass data to view to display list of product
    if (req.user.type == "admin")
        res.render('products/productlist', { pagination: { page: parseInt(page), limit: 10, totalRows: count }, products });
    else if (req.user.type == "staff")
        res.render('products/productlist', { layout: "layoutstaff", pagination: { page: parseInt(page), limit: 10, totalRows: count }, products })
}

exports.addnew = async (req, res, next) => {
    res.render('products/addnew', {});
}

exports.create = async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        console.log("Thong tin trong fields: ", fields);
        productModel.create(fields);
    })
    res.redirect('/products?page=1');
}
exports.edit = async (req, res, next) => {
    productModel.edit(req);
    res.redirect('/products?page=1');
}
exports.detail = async (req, res, next) => {
    let productId = req.query.id;
    //Pass data to view to display list of product
    const product = await productModel.product(productId);
    if (req.user.type == "admin") {
        res.render('products/detail', { product });
    }
    else if (req.user.type == "staff") {
        res.render('products/detail', {layout: "layoutstaff", product });
    }
}

exports.remove = async (req, res, next) => {
    const query = req.query.id;
    const result = await productModel.deleteOne(query);
    if (result === 1) {
        console.dir("Successfully deleted one document.");
        res.redirect('/products?page=1');
    } else {
        console.log("No documents matched the query. Deleted 0 documents.");
    }
}

exports.search = async (req, res, next) => {

    const page = +req.query.page || 1;
    const title = req.query.searchedproduct;
    const products = await productModel.search(page, title);
    const count = await productModel.countByTitle(title);
    if (req.user.type == "admin") {
        res.render('products/productlist', { pagination: { page: parseInt(page), limit: 10, totalRows: count, queryParams: { searchedproduct: title } }, products });
    }
    else if (req.user.type == "staff") {
        res.render('products/productlist', {layout:"layoutstaff", pagination: { page: parseInt(page), limit: 10, totalRows: count, queryParams: { searchedproduct: title } }, products });
    }
}

exports.searchByType = async (req, res, next) => {
    const page = +req.query.page || 1;
    const type = req.query.type;
    const products = await productModel.type(page, type);
    const count = await productModel.countByType(type);
    if (req.user.type == "admin") {
        res.render('products/productlist', { pagination: { page: parseInt(page), limit: 10, totalRows: count, queryParams: { type: type } }, products });
    }
    else if (req.user.type == "staff") {
        res.render('products/productlist', {layout:"layoutstaff", pagination: { page: parseInt(page), limit: 10, totalRows: count, queryParams: { type: type } }, products });
    }
    res.render('products/productlist', { pagination: { page: parseInt(page), limit: 10, totalRows: count, queryParams: { type: type } }, products });
}

exports.setstate = async (req, res, next) => {
    const state = await productModel.setstate(req);
    res.redirect('/products/detail' + '?id=' + req.params.id);
}