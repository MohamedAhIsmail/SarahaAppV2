
import userModel from "../../../DB/models/User.model.js";
import * as bcrypt from "bcrypt";
import cryptojs from "crypto-js";
import jwt from "jsonwebtoken"
import sendEmail from "../../../utilities/sendEmail.js";




//Register

export const register = async (req, res) => {
  try {

    const { userName, email, password, confirmedPassword, phone} = req.body;


    if (password != confirmedPassword) {
      return res.status(422).json({message: "Password and Confirmed Password should be the same",});
    }

    if (await userModel.findOne({ email })) {
      return res.status(409).json({ message: "This email is already exist" });
    }

    const encryptPhone = cryptojs.AES.encrypt(phone, process.env.SECRETKEY);

    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))

    const user = await userModel.create({ userName, email, password:hashPassword, phone:encryptPhone});


    const objectUser = user.toObject()
    delete objectUser.password

    //Send Email

    const token = jwt.sign({email}, process.env.CONFIRM_EMAIL)
    const url = `${req.protocol}://${req.hostname}:8888${req.baseUrl}/verify/${token}`

    sendEmail(objectUser.email, url)
    

    res.status(200).json( {message: "Welcome to register page!", objectUser});
  } catch (error) {
    res.status(500).json({message: "Server Error" ,error : error.message});
  }
};


//Login

export const login = async (req, res) => {
  try {

    const {email, password} = req.body;

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "Email is not exist" });
    }

    const match = bcrypt.compareSync(password, user.password)

    if (!match) {
      return res.status(404).json({ message: "Invalid Password" });
    }

    const objectUser = user.toObject()
    delete objectUser.password

    //Create Token

    const token = jwt.sign({id:user._id, isLoggedIn: true}, process.env.TOKEN_SECRETKEY)

    res.status(200).json( {message: "Welcome to Saraha App", token});
  } catch (error) {
    res.status(500).json({message: "Server Error" ,error : error.message});
  }
};


// Verify Email

export const verify = async (req, res)=> {
  try {
    const  {token} = req.params;
    const decoded  = jwt.verify(token, process.env.CONFIRM_EMAIL);
    const user = await userModel.findOne({email:decoded.email});
    if (!user) {
      return res.status(404).json({messsage: "Email not found"})
    }  
    await userModel.findByIdAndUpdate(user._id, {confirmEmail: true}, {new: true})
    res.status(200).json({message: "Email Verified"})
  } catch (error) {
    res.status(500).json({message: "Server Error" ,error : error.message});
  }
}
