import {Request, Response} from "express";
import attackModel, {IAttack} from "../models/attackModel";
import {addAttackLonch} from "../services/attackService";

export const getAttacksByDestination = async (req: Request, res: Response) => {

    const { destination} = req.params;

    try {
        const attacks = await attackModel.find({destination});
        if(attacks == null){
            res.status(404).json({message: "No attacks found"})
            return
        }
        res.status(200).json(attacks)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
    
}

export const getAttacksByLocation = async (req: Request, res: Response) => {

    const { location} = req.params;

    try {
        const attacks = await attackModel.find({location});
        if(attacks.length === 0){
            res.status(404).json({message: "No attacks found"})
            return
        }
        res.status(200).json(attacks)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
    
}
export const addAttack = async (req: Request, res: Response) => {
    const { missileName, destination,location, missileDetails, status } = req.body;
    
    try {
        const newAttack = await addAttackLonch({missileName, destination, location, missileDetails, status});
        if(newAttack){
            res.status(201).json({message: `${newAttack.missileName} You had success attack!`});
            return;
        }
            res.status(500).json({message: "attack no provied!"});
            

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
        
    }
}

// export const  removeAttack = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     try {