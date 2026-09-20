import { Router } from "express";

import {
    createRegistration,
    getRegistrations,
} from "../controllers/registration.controller.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();


// Student registration
router.post(
    "/",
    createRegistration
);


// Admin registration list
router.get(
    "/",
    requireAdmin,
    getRegistrations
);


export default router;