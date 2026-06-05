import { incrementCounter } from "../repositories/counter.repository.js";
import { createUrl, getOriginalUrl } from "../repositories/urls.repository.js";
import ApiError from "../utils/ApiError.js";
import { encodeBase62 } from "../utils/base62.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { redisClient } from "../config/redis.js";

/*
1. get a id using id generation service.
2. store the id along with original url into the db.
3. return the newly generated id.
*/
const transformUrl = asyncHandler(
    async (req, res) => {
        const counter = await incrementCounter();
        const shortID = encodeBase62(counter);
        const url = req.body.url;

        await createUrl(shortID, url);
        return res.status(201).json(
            new ApiResponse(201, {
                shortID: shortID,
                originalUrl: url,
            })
        );
    }
);

/*
1. check cache if id exists
2. if exists return from cache
3. if not query db, set the data in cache then return
*/
const getId = asyncHandler(
    async (req, res) => {
        const id = req.params.id;

        let url = await redisClient.get(id)
        if (!url) {
            url = await getOriginalUrl(id);
            if (!url) {
                throw new ApiError(404, "URL not found");
            }
            await redisClient.set(id, url, {
                EX: 86400
            });
        }
        
        res.redirect(url);
    }
);

export { transformUrl, getId};