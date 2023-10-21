import { NextFunction, Request, Response } from "express";
import ChatUser from "../models/ChatUser.js";
import { compare, hash} from "bcrypt";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const users= await ChatUser.find();
        return res.status(200).json({message:"OK", users})
    } catch (error) {
        console.log(error);
        return res.status(404).json({message: "ERROR", cause:error.message})
    }
}

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user signup
      const { name, email, password } = req.body;
      const existingUser = await ChatUser.findOne({ email });
      if (existingUser) return res.status(401).send("User already registered");
      const hashedPassword = await hash(password, 10);
      const user = new ChatUser({ name, email, password: hashedPassword });
      await user.save();
  
    
  

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
     
  
      return res
        .status(201)
        .json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: "ERROR", cause: error.message });
    }
  };


  