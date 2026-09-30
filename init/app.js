const mongoose = require("mongoose");

const initData = require("./data.js");

const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("connection successful");
}

const initDB = async () => {
    try {
        await main();

        const user = await User.findOne();

        if (!user) {
            console.log("No user found. Please create a user first.");
            return;
        }

        console.log("Using user:", user.username);
        console.log("User ID:", user._id);

        await Listing.deleteMany({});

        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: user._id
        }));

        await Listing.insertMany(initData.data);

        console.log("data was initialized");
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
    }
};

initDB();