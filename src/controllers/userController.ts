import {Request, response, Response} from "express";
import userModel, {IUser} from "../models/userModel";
import {getAllUsers, loginUser, registerUser} from "../services/userService";
import { generateToken } from "../utils/auth";
import missleModel from "../models/missleModel";
import organizationModel,{IOrganization} from "../models/organizationModel";
import type {Resource}  from "../models/organizationModel";



interface missleDetails{
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
    amount: number
}

export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await getAllUsers();
        if(!users){
            res.status(404).json({message: "No users found"})
            return
        }
        res.status(200).json(users)


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
        
    }
}

export const register = async (req: Request, res: Response) => {
    const { username, password,organization, location} = req.body;

    if( await userModel.findOne({username})){
         res.status(400).json({message: "User already exists"})
    }
    
    try {
        const newUser = await registerUser({username, password, organization, location});
        if(newUser){
            res.status(201).json({message: `${newUser.username} You have successfully registered`});
            return;
        }
            res.status(500).json({message: "user no provied!"});
            

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
        
    }
}



export const login = async (req: Request, res: Response, next: any) => {
    const { username, password } = req.body;
    
    const user = await loginUser(username, password);
    if (!user) {
         res.status(404).json({ message: "User not found" });
         return
    }
    
    const role = user?.location ? user?.location : user?.organization;
    const org = await organizationModel.findOne({ name: role });
    
    const missles: any = [];

    if (org && org.resources) {
        await Promise.all(org.resources.map(async (obj) => {
            const add = await missleModel.findOne({ name: obj.name });
            if (add) {
                const missle: missleDetails = {
                    name: add.name,
                    description: add.description,
                    speed: add.speed,
                    intercepts: add.intercepts,
                    price: add.price,
                    amount: obj.amount
                };
                missles.push(missle);
            }
        }));

        
        
        const responseData: any = {
            username: user?.username,
            organization: user?.organization,
            weapons: missles
        };
        
        const token = generateToken(user?.id, user?.organization);
         res.status(200).json({ message: "User logged in successfully", responseData, token });
         return;
    }

    res.status(400).json({ message: "Organization or resources not found" });
};
