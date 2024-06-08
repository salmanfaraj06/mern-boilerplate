// Path: server/controllers/auth.controller.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import crypto from "crypto";

const generatePassword = (length) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const result = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET || "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result, token });
    console.log("User registered successfully");
  } catch (error) {
    next(error); // Passes the error to the error-handling middleware
  }
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

export const login = [
  loginLimiter,
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(404).json({ message: "User doesn't exist" });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
      console.log("User logged in successfully");
    } catch (error) {
      next(error);
    }
  },
];

const generateUniqueUsername = async (baseName) => {
  let username = baseName.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase
  let user = await User.findOne({ username });
  let suffix = 1;

  while (user) {
    username = `${baseName.replace(/\s+/g, "").toLowerCase()}${suffix}`;
    user = await User.findOne({ username });
    suffix++;
  }

  return username;
};

export const googleLogin = async (req, res, next) => {
  const { email, name, photo } = req.body;
  console.log("Google login request received");
  console.log("Email:", email + "\nName:", name + "\nPhoto:", photo);

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const generatedPassword = generatePassword(12);
      const hashedPassword = await hashPassword(generatedPassword);
      const username = await generateUniqueUsername(name);

      user = await User.create({
        email,
        username,
        password: hashedPassword,
        profilePic: photo,
      });

      console.log("User registered successfully");
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET || "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: user, token });
    console.log("User logged in successfully");
  } catch (error) {
    next(error);
  }
};
