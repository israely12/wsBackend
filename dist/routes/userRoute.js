"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
// userRouter.get("/",getUsers);
userRouter.post("/register", userController_1.register);
// userRouter.post("/login",login);
exports.default = userRouter;
