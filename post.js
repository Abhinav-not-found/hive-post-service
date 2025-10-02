import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from "cookie-parser";

import connectToDatabase from './config/db.js';
import postRoute from './routes/post.route.js'

dotenv.config();
connectToDatabase();
const ORIGIN_URL = process.env.ORIGIN_URL_PROD || process.env.ORIGIN_URL

const app = express()
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
  origin: ORIGIN_URL,
  credentials: true
}));

app.get('/', async (req, res) => {
  res.send('Post service is running.');
})

app.use('/api/post', postRoute)

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).json({
    message: "Internal Server Error"
  })
})

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Post Service is running on port ${PORT}`.bgCyan)
})

