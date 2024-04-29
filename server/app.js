import express from 'express'
import dotenv from 'dotenv'

import productRoutes from './routes/product.routes.js'
import { connectDatabase } from './config/db.connect.js'

const app = express()

dotenv.config({path: "server/config/config.env"})

connectDatabase()

app.use("/api/v1", productRoutes )

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})