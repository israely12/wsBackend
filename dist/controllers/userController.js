"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userService_1 = require("../services/userService");
// import { generateToken } from "../utils/auth";
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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, organization, location } = req.body;
    if (yield userModel_1.default.findOne({ username })) {
        res.status(400).json({ message: "User already exists" });
    }
    try {
        const newUser = yield (0, userService_1.registerUser)({ username, password, organization, location });
        if (newUser) {
            res.status(201).json({ message: `${newUser.username} You have successfully registered` });
        }
        res.status(500).json({ message: "user no provied!" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.register = register;
// export const login = async (req: Request, res: Response) => {
//     const { username, password } = req.body;
//     const user = await loginUser(username, password);
//     if(!user){
//          res.status(404).json({message: "User not found"})
//     }
//         const token = generateToken(user?.id, Boolean(user?.isAdmin));
//         res.status(200).json({message: "User logged in successfully", user, token});
//         return;
// }
