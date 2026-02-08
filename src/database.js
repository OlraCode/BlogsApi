const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch((e) => {
        console.log("Database connection failed: ", e.message);
        setTimeout(connectDB, 5000);
    });
};

module.exports = connectDB;
