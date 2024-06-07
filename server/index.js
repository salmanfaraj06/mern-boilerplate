import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
// import cors from 'cors';

const app = express();

app.listen(3000, () => {
  console.log("Server started at port 3000");
});

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(express.json());
// app.use(cors());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({ message: err.message });
// });