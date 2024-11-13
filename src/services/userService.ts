import userModel,{ IUser } from "../models/userModel";

export const getAllUsers = async (): Promise<IUser[]> => {
    const users = await userModel.find({});
    return users;
};

export const registerUser = async (user: Partial<IUser>): Promise<IUser> => {
    const newUser = await userModel.create(user);
    return await  newUser.save();
};

export const loginUser = async (username: string, password: string): Promise<IUser | null>  => {

    const user = await userModel.findOne( {username});

    if (!user || !(await user.comparePassword(password))) {

        throw new Error("Incorrect username or password");
           
      }
      await user.save();
      return user;   
    }