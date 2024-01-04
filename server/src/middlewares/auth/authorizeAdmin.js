const CustomError = require("../../errors/CustomError");
const authorizeAdmin = async(req,_res,next)=>{
    if(req.user.role !== 'admin'){
        return next(new CustomError('Only super-admin can access',403));
    }
    next();
}

module.exports = authorizeAdmin;