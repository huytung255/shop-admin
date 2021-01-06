const promoModel = require('../models/promoModel');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDKEY,
    api_secret: process.env.CLOUDSECRET
});


exports.promoList = async (req, res, next) => {
    const page = +req.query.page || 1;
    count = await promoModel.count();
    promos = await promoModel.promoList(page);
    res.render('promo/promolist', { pagination: { page: parseInt(page), limit: 10, totalRows: count }, promos });
}

exports.createPromoLayout = async (req, res, next) => {
    res.render('promo/addnew');
}

exports.createPromo = async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        console.log("Thong tin trong fields: ", fields);
        const coverimage = files.coverimage;
        fields.cover = "";

        if (coverimage && coverimage.size > 0) {
            cloudinary.uploader.upload(coverimage.path, { folder: "fast-shop/promo" },
                function (error, result) {
                    if (error) {
                        next(error)
                        return;
                    }
                    fields.cover = result.secure_url;
                    promoModel.createPromo(fields);
                    res.redirect('/promo?page=1');
                });
        }
        else {
            promoModel.createPromo(fields);
            res.redirect('/promo?page=1');
        }
    })
}

exports.promoDetail = async (req, res, next) => {
    const id = req.query.id;
    promoDetail = await promoModel.promoDetail(id);
    res.render('promo/detail', { promoDetail });
}

exports.promoEdit = async (req, res, next) => {
    const id = req.query.id;
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        console.log("Thong tin trong fields: ", fields);
        const coverimage = files.coverimage;
        fields.cover = fields.savedimage;
        if (coverimage && coverimage.size > 0) {
            cloudinary.uploader.upload(coverimage.path, { folder: "fast-shop/promo"},
                function (error, result) {
                    if (error) {
                        next(error)
                        return;
                    }
                    fields.cover = result.secure_url;
                    promoModel.promoEdit(fields, id);
                    res.redirect('/promo/detail?id='+id);
                });
        }
        else {
            console.log(fields.savedImage);
            console.log(fields.cover);
            promoModel.promoEdit(fields, id);
            res.redirect('/promo/detail?id='+id);
        }
    })
    
}

exports.promoToggle = async (req, res, next) => {
    id = req.query.id;
    var toggle;
    if (req.query.toggle == 'true') {
        toggle = true;
    }
    else {
        toggle =false;
    }
    await promoModel.promoToggle(id,toggle);
    res.redirect('/promo/detail?id='+id);
}