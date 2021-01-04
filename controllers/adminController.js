const adminModel = require('../models/adminModel');

exports.detail = async(req, res, next)=>{
    const admin = req.user
    console.log(admin);
    res.render('admin/admininformation', {admin});
}

exports.update = async(req, res, next)=>{
    const admin = await adminModel.update(req);
    res.redirect('/admin/detail');
}