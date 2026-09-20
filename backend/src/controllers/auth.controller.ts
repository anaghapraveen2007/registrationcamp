import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function login(
    req: Request,
    res: Response
) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required.",
            });
        }

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
            username !== adminUsername ||
            password !== adminPassword
        ) {
            return res.status(401).json({
                message: "Invalid username or password.",
            });
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured.");
        }

        const token = jwt.sign(
            {
                role: "admin",
                username,
            },
            secret,
            {
                expiresIn: "1d",
            }
        );

        return res.json({
            message: "Login successful.",
            token,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Login failed.",
        });
    }
}