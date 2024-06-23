import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import colors from 'colors'

// Connect to MongoDB 
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use((err,req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Route

const PORT = process.env.PORT || 5000
const HOSTNAME = process.env.HOSTNAME || localhost

app.listen(
    PORT, HOSTNAME,
    ()=>{
        console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
    })