const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log(`Database Connected Successfully with ${process.env.MONGO_URI}`);
        })
    } catch (error) {
        console.log('Error in Database Connection!\n', error);
    }
}

module.exports = connectDB;