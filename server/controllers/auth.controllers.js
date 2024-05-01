import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";


//Register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  sendToken(user,201,res)

});

//Login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(ErrorHandler('Please enter a valid email address and password'), 400);
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(ErrorHandler('Incalid email or password'), 401)
    }

    //Check password
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(ErrorHandler('Invalid email or password'), 401)
    }

  sendToken(user,200,res)

  });

  export const logout = catchAsyncErrors(async (req, res, next) =>{
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })

    res.status(200).json({
      message: 'Logged Out'
    })
  })
