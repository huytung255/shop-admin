const productModel = require('../models/model');
//import list from '../model/productModel';

exports.productlist = async (req, res, next)=>{
    const page = +req.query.page || 1;
    const products = await productModel.products(page);
    count = await productModel.count();
    //Pass data to view to display list of product
    res.render('products/productlist', {pagination: { page: parseInt(page), limit:10, totalRows: count}, products});
}
exports.addnew = async (req, res, next)=>{
    res.render('products/addnew',{});
}
exports.create = async (req, res, next)=>{
    productModel.create(req);
    res.redirect('/products?page=1');
}
exports.edit= async(req, res, next)=>{
    productModel.edit(req)
    res.redirect('/products?page=1');
}
exports.detail = async(req, res, next)=>{
    let productId = req.params.id;
    //Pass data to view to display list of product
    const product = await productModel.product(productId);
    console.log(product);
    res.render('products/detail', {product});
}

exports.delete = async (req, res, next)=>{
    const query = req.body.title;

    const result = await productModel.deleteOne(query);
    if (result === 1) {
    console.dir("Successfully deleted one document.");
    res.redirect('/products?page=1');
    } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            }       
}

exports.search = async (req, res, next)=>{
    const title = req.query.searchedproduct;
    const searchedproduct = await productModel.search(title);
    res.render('products/search', {searchedproduct});
}

exports.searchByCategory = async (req, res, next)=>{
    const page = +req.query.page || 1;
    const category = req.query.category;
    const productsbycategory = await productModel.category(page,category);
    const count = await productModel.countByCategory(category);
    console.log(productsbycategory);
    console.log(count);
    res.render('products/category', {pagination: { page: parseInt(page), limit:10, totalRows: count, queryParams: {category: category}}, productsbycategory});
}

