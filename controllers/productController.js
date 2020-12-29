const productModel = require('../models/model');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
//import list from '../model/productModel';

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.CLOUDKEY, 
    api_secret: process.env.CLOUDSECRET 
  });

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
    const form = formidable({multiples:true});
    form.parse(req, (err, fields, files)=>{
        if(err){
            console.log(err);
            next(err);
            return;
        }
        const coverimage=files.coverimage;
        //const path='C:\\Users\\nguye';
        //console.log("fields: ", fields);
        //console.log("\nfiles: ", files);
        if(coverimage && coverimage.size > 0)
        {
            //const filename = coverimage.path.split('\\').pop() + '.' + coverimage.name.split('.').pop();
            //console.log(filename);
            //fs.renameSync(coverimage.path, path + '\\' + filename);
            //fields.cover = '/images/book/' + filename;
            //console.log("Link hinh: ", fields.cover);
            console.log("Cho luu hinh: ", coverimage.path);
            cloudinary.uploader.upload(coverimage.path,{folder: "fast-shop/"+fields.category}, 
            function (error, result) {
                    if(error){
                        next(error)
                        return;
                    }
                    //console.log(result, error);
                    fields.cover = result.secure_url;
                    //console.log(fields);
                    productModel.create(fields);
            });
        }
    })
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

    const page = +req.query.page || 1;
    const title = req.query.searchedproduct;
    const searchedproduct = await productModel.search(page,title);
    const count = await productModel.countByTitle(title);
    console.log(count);
    res.render('products/search', {pagination: { page: parseInt(page), limit:10, totalRows: count, queryParams: {searchedproduct: title}}, searchedproduct});
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

