const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
require('dotenv').config();

const connectDB = require('./config/connectDB');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    try {
        res.json({
            'Name': 'Roxiler Rating Store Server',
            'Status': 'Active',
            'Date & Time': new Date()
        })
    } catch (error) {
        console.log(error);
    }
})

connectDB();

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is Running on port ${port}`);
    } else {
        console.log('Error in Server Connection.\n', err);
    }
})
