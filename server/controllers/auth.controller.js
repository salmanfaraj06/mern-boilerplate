// Path: server/controllers/auth.controller.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 12);

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
    } catch (error) {
        next(error); // Passes the error to the error-handling middleware
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.JWT_SECRET || "test",
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        next(error); 
    }
}
