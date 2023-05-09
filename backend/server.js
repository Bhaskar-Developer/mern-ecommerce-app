import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// use morgan to log request
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mount Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// route to get paypal clientId
const __dirname = path.resolve()
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

if(process.env.NODE_ENV === 'production') {
    // make the build folder static
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    // if we go to / route in API in production mode then serve the index.html page from frontends build folder
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')) )
} else {
    app.get('/', (req, res) => {
        res.send("API is running...")
    })
}

// make uploads folder static so that files can be uploaded to it
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Not Found and Error Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})
