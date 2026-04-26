const mongoose = require("mongoose");

let isConnected = false;

async function connectToMongoDB(url) {
    if (isConnected) return;

    await mongoose.connect(url, {
        dbName: "test",
    });

    isConnected = true;
    console.log("MongoDB Connected");
}

module.exports = { connectToMongoDB };