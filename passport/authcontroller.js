module.exports = {
    checkNotAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        if(req.user.type==="admin"){
          return res.redirect('admin/detail');
        }
        else if(req.user.type==="staff"){
          return res.redirect('staff/detail/5ff2a1d68a8fca5f99595be3');
        }
      }
      else{
        next();
      }
    },
    checkAuthenticated: function(req, res, next){
      if(req.isAuthenticated()){
        return next();
      }
      res.redirect("/login");
    },
    checkAdminAuthenticated: function (req, res, next) {
      if (req.isAuthenticated() && req.user.type==="admin") {
        //console.log("check admin: ", req.user.type);
        return next();
      } else {
        //console.log("May khong phai admin!");
        res.redirect("/login");
      }
    },
    checkStaffAuthenticated: function(req, res, next){
      if(req.isAuthenticated() && req.user.type==="staff"){
        return next();
      } else {
        //console.log("May khong phai nhan vien!");
        res.redirect("/login");
      }
    }
  };