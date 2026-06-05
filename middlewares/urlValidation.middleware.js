import { z } from "zod";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const urlSchema = z.object({
    url: z.httpUrl()
});

const validateUrl = asyncHandler((req, res, next) => {
    const result = urlSchema.safeParse(req.body);
    if (!result.success) {
        throw new ApiError(400, result.error.issues[0].message);
    }
    next();
});

export default validateUrl;