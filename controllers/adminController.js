const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const saltRounds=10;
exports.detail = async(req, res, next)=>{
    const admin = req.user
    res.render('admin/admininformation', {admin});
}

exports.update = async(req, res, next)=>{
    const admin = await adminModel.update(req);
    res.redirect('/admin/detail');
}

exports.changepw = async(req, res, next)=>{
    const {current_password, new_password, retype_password}=req.body;
   
    let errors = [];
    //Check valid
    if (new_password.length < 6) {
        errors.push('Password is at least 6 characters.');
    }
    if (new_password != retype_password) {
        errors.push('Password is not match together')
    }
    if (errors.length > 0) {
        res.render('admin/changepassword', { errors: errors });
        return;
    }
    //Check Current password
    bcrypt.compare(current_password, req.user.PASSWORD, async (err, result) => {
        if (err) throw err;
        if (result) {
            //Update password
            bcrypt.hash(new_password, saltRounds, async (err, hash) => {
                if (err) throw err;
                await adminModel.changepw(req.user._id, hash);
                res.redirect('/admin/detail');
            });
        } else {
            errors.push('Current password is incorrect.');
            res.render('admin/changePassword', { errors: errors });
            return;
        }
    });
    

}

exports.GetChangePasswordPage = async(req, res, next)=>{
    res.render('admin/changepassword');
}