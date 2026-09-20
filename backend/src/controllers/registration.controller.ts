import { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/prisma.js";

export async function createRegistration(
    req: Request,
    res: Response
) {
    try {
        const {
            fullName,
            phone,
            department,
            year,
            parentName,
            parentPhone,
        } = req.body;

        if (
            !fullName ||
            !phone ||
            !department ||
            !year ||
            !parentName ||
            !parentPhone
        ) {
            return res.status(400).json({
                message: "All fields are required.",
            });
        }

        const registration =
            await prisma.registration.create({
                data: {
                    fullName,
                    phone,
                    department,
                    year,
                    parentName,
                    parentPhone,
                },
            });

        return res.status(201).json({
            message: "Registration successful.",
            registration,
        });

    } catch (error) {

        // Duplicate phone number
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return res.status(409).json({
                message:
                    "This phone number is already registered.",
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Something went wrong.",
        });
    }
}


// Get registrations
export async function getRegistrations(
    _req: Request,
    res: Response
) {

    try {

        const registrations =
            await prisma.registration.findMany({

                orderBy: {
                    createdAt: "desc",
                },

            });


        return res.json({
            registrations,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch registrations.",
        });

    }

}