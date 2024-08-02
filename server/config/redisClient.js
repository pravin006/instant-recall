import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
})

redis.on('connect', () => {
    console.log('Connected to Redis'.red.underline.bold);
});

redis.on('error', (err) => {
    console.error('Redis error:', err)
})

export default redis