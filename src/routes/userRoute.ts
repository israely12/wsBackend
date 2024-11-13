import { Router } from "express";
import { register,login,getUsers} from "../controllers/userController";
const userRouter = Router();

userRouter.get("/",getUsers);
userRouter.post("/register",register);
userRouter.post("/login",login);

export default userRouter
