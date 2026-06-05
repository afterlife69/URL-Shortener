import { z } from "zod";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const shortIdSchema = z.object({
    id: z
        .string()
        .min(1)
        .max(10)
        .regex(
            /^[0-9a-zA-Z]+$/,
            "Invalid Short ID provided"
        ),
});

const validateId = asyncHandler((req, res, next) => {
    const result = shortIdSchema.safeParse(req.params);
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0].message);
    }
    next();
});

export default validateId;