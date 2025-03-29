const mongoose = require('mongoose');

const DBconnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://ishitasurati83:12345@cluster0.v0zl5km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = DBconnect;