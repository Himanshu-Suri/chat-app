import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js"
import cors from "cors";
import path from "path";
import { app, server } from "./lib/socket.js";

dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json({limit: '100mb'}));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/my-react-app/dist")));
  app.all(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/my-react-app/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is running!~")
  connectDB();
})