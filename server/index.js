import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

dotenv.config();
// import cors from 'cors';

const app = express();

app.listen(5000, () => {
  console.log("Server started at port 5000");
});

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));


app.use('/api/user', userRoute);