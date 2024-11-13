import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectToDB";
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import userRouter from "./routes/userRoute"

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: '*', 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}))

// export const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// }) 
// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// })


app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();

// Routes
app.use("/api/users", userRouter);
// app.use("/api/candidates");

// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


