import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/user.model.js";

export const isAuthendicatedUser = catchAsyncErrors(async(req,res,next) =>{
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler('Login first to access this resource', 401))

    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)


    req.user = await User.findById(decoded.id)

    next()
});

export const authorizeRoles = (...roles) => {
    return (req,res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler (`Role (${req.user.role}) is not allowed to access this resource`, 403))
        }
        next()
    }
}