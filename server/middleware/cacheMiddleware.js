import redis from '../config/redisClient.js'

const cacheMiddleware = async (req, res, next) => {
    const { query, operationName, variables } = req.body

    const isQuery = query.trim().startsWith('query')
    if (!isQuery) {
        return next()
    }

    const key = `${operationName}_${variables?._id}`
    try {
        const cachedResponse = await redis.get(key)
        if (cachedResponse) {
            res.send(JSON.parse(cachedResponse))
        } else {
            // save the original res.send method
            res.sendToClient = res.send
            // override res.send that the graphqlHTTP calls to caching before sending to client
            res.send = (body) => {
                redis.set(key, JSON.stringify(body), 'EX', 43200)
                res.sendToClient(body)
            }
            next()
        }
    } catch (error) {
        console.error('Cache error:', error)
        next()
    }
}

export default cacheMiddleware