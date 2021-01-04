const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { use } = require('passport');
const { ObjectId } = require('mongodb');
//Load User model 
const adminmodel = require('../models/adminModel');
const staffmodel = require('../models/staffModel');

module.exports = (passport) => {

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            //Find user
            let user = await adminmodel.findOne({ ADMIN_EMAIL: email });

            if (!user) {
                //staff
                user = await staffmodel.findOne({ STAFF_EMAIL: email });
                if (!user) {
                    return done(null, false, { message: 'That email is not registered.' });
                } else {
                    //staff
                    bcrypt.compare(password, user.PASSWORD, (err, result) => {
                        if (err) throw err;
                        if (result) {
                            return done(null, user);
                        } else {
                            console.log('Password is incorrect.');
                            return done(null, false, { message: 'Password staff incorrect.' });
                        }
                    });
                }
            }
            //Macth password
            else {
                //Admin
                bcrypt.compare(password, user.PASSWORD, (err, result) => {
                    if (err) throw err;
                    if (result) {
                        return done(null, user);
                    } else {
                        console.log('Password is incorrect.');
                        return done(null, false, { message: 'Password admin incorrect.' });
                    }
                });
            }
        })
    );
    passport.serializeUser((user, done) => {
        console.log("Ham serialize");
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        console.log('Ham deserialize ID user: ' + id);
        let user = await adminmodel.findOne({ _id: new ObjectId(id) });
        if (user) {
            user.type = "admin";
            return done(null, user);
        }
        user = await staffmodel.findOne({ _id: new ObjectId(id) });
        user.type = "staff";

        return done(null, user);
    });
}