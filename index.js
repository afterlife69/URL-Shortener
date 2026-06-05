import env from './config/cleanedenv.js';
import { redisClient } from './config/redis.js';
import app from './app.js';

const PORT = env.PORT;

(async () => {  
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }

    app.listen(PORT, () => {
        console.log('Server Running on ' + PORT);
    });
})();