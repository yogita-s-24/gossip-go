import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
export const signup = async (req, res) =>{

    const {fullName,email,password,profilePic} = req.body;

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message : "All fields are required."});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at 6 characters."});
        }

        const user = await User.findOne({email});

        if(user) return res.status(400).json({message : "Email already exists."});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password : hashPassword
        })

        // console.log(newUser)

        if(newUser){
         //generate the jwt token here
         generateToken(newUser._id, res);
         await newUser.save();

         res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic,
         });
        }
        else{
            res.status(400).json({message : "Invalid user date"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message : "Internal Server Error"})
        }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message : "Invalid credentials"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json ({message :"Invalid credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic: user.profilePic
        })

    }catch(error){
      console.log("Error in login controller", error.message);
      return res.status(500).json({message :"Internal Server Error"});
    }
    
}

export const logout = async (req, res) =>{
    res.send("Logout Route")
}