import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
// import cors from 'cors';

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.listen(3000, () => {
  console.log("Server started at port 3000");
});

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(express.json());
app.use(cookieParser()); 
app.use(cors());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use(bodyParser.json({ limit: '10mb' }));