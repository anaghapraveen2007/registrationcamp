import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";


export function requireAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {

        const authorization =
            req.headers.authorization;


        if (!authorization) {

            return res.status(401).json({
                message: "Authentication required.",
            });

        }


        const token =
            authorization.replace(
                "Bearer ",
                ""
            );


        const secret =
            process.env.JWT_SECRET;


        if (!secret) {

            throw new Error(
                "JWT_SECRET is not configured."
            );

        }


        const decoded =
            jwt.verify(
                token,
                secret
            );


        if (
            typeof decoded !== "object" ||
            decoded.role !== "admin"
        ) {

            return res.status(403).json({
                message: "Admin access required.",
            });

        }


        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token.",
        });

    }

}