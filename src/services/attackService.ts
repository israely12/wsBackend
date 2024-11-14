import attackModel,{IAttack} from "../models/attackModel";


export const addAttackLonch = async (attack: Partial<IAttack>) : Promise<IAttack> => {
    try {
        const newAttack = await attackModel.create(attack);
        await newAttack.save();
        return newAttack;
    } catch (error) {
        console.error(error);
        throw error;
    }
};