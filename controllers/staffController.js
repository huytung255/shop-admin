const staffModel = require('../models/staffModel');
const bcrypt = require('bcrypt');
const saltRounds=10;
exports.stafflist = async (req, res, next)=>{
    const page = +req.query.page || 1;
    const staffs = await staffModel.staffs(page);
    count = await staffModel.count();
    console.log(staffs);
    //Pass data to view to display list of product
    res.render('staff/stafflist', {pagination: { page: parseInt(page), limit:10, totalRows: count}, staffs});
}

exports.detailviewadmin = async(req, res, next)=>{
    let staffId = req.params.id;
    //Pass data to view to display list of product
    const staff = await staffModel.staff(staffId);
    console.log(staff);
    res.render('staff/staffinformationva', {staff});
}

exports.create = async (req, res, next)=>{
    staffModel.create(req);
    res.redirect('/staff?page=1');
}

exports.addstaff = async (req, res, next)=>{
    res.render('staff/addstaff');
}

exports.delete = async (req, res, next)=>{
    const query = req.params.id;

    const result = await staffModel.deleteOne(query);
    if (result === 1) {
    console.dir("Successfully deleted one document.");
    res.redirect('/staff?page=1');
    } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            }       
}

exports.detail = async(req, res, next)=>{
    const staff = req.user
    console.log(staff);
    res.render('staff/staffinformation', {layout: 'layoutstaff', staff});
}

exports.update = async(req, res, next)=>{
    const staff = await staffModel.update(req);
    res.redirect('/staff/detail/:'+req.user._id);
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
        res.render('staff/changepassword', {layout : 'layoutstaff', errors: errors });
        return;
    }
    //Check Current password
    bcrypt.compare(current_password, req.user.PASSWORD, async (err, result) => {
        if (err) throw err;
        console.log('OKe1');
        if (result) {
            //Update password
            bcrypt.hash(new_password, saltRounds, async (err, hash) => {
                if (err) throw err;
                console.log('OKe2');
                await staffModel.changepw(req.user._id, hash);
                res.redirect('/staff/detail/' + req.user._id);
            });
        } else {
            errors.push('Current password is incorrect.');
            res.render('staff/changePassword', {layout : 'layoutstaff', errors: errors });
            return;
        }
    });
    

}

exports.GetChangePasswordPage = async(req, res, next)=>{
    res.render('staff/changepassword', {layout: 'layoutstaff'});
}