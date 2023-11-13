import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User 
req is the req body we get from the front end and send to the backend
res is the response we get from the backend and deliver it to the front end
*/
export const register = async(req, res) =>{ 
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); //we are going to use this salt value to encrypt our password
        const passwordHash = await bcrypt.hash(password, salt);


    const newUser = new User({
        firstName,
            lastName,
            email,
            password :  passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}