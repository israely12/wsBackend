"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDB_1 = __importDefault(require("./config/connectToDB"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
exports.io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
(0, connectToDB_1.default)();
// Routes
app.use("/api/users");
// app.use("/api/candidates");
// Error handling middleware
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
