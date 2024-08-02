import express from 'express'
import colors from 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import {graphqlHTTP} from 'express-graphql'
import schema from './schema/schema.js'
import connectDB from './config/db.js'
import cacheMiddleware from './middleware/cacheMiddleware.js'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(express.json())

app.use(cors())

app.use('/graphql',cacheMiddleware,graphqlHTTP({
    schema:schema,
    graphiql:process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`listening on port ${port}`.green.underline.bold))