import {Request, Response} from "express";
import userModel, {IUser} from "../models/userModel";
import {getAllUsers, loginUser, registerUser} from "../services/userService";
import { generateToken } from "../utils/auth";
import missleModel from "../models/missleModel";

// export const getUsers = async (req: Request, res: Response) => {

//     try {
//         const users = await getAllUsers();
//         if(!users){
//             res.status(404).json({message: "No users found"})
//             return
//         }
//         res.status(200).json(users)


//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"})
        
//     }
// }
export const register = async (req: Request, res: Response) => {
    const { username, password,organization, location} = req.body;

    if( await userModel.findOne({username})){
         res.status(400).json({message: "User already exists"})
    }
    
    try {
        const newUser = await registerUser({username, password, organization, location});
        if(newUser){
            res.status(201).json({message: `${newUser.username} You have successfully registered`});
        }
            res.status(500).json({message: "user no provied!"});
            return;

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
        
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    if(!user){
         res.status(404).json({message: "User not found"})
    }   
        const location = user?.location;
        if(!location){
        let responseData:any = {
            username: user?.username,
            organization: user?.organization,
            

        };
        const token = generateToken(user?.id, Boolean(user?.isAdmin));
        res.status(200).json({message: "User logged in successfully", user, token});
        return;
       
}