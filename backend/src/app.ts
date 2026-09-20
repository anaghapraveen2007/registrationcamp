import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import registrationRoutes from "./routes/registration.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "College Camp Registration API",
        status: "running",
    });
});

app.use("/api/auth", authRoutes);

app.use(
    "/api/registrations",
    registrationRoutes
);

export default app;