const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
const mongoConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to mongoDb", error.message);
    process.exit(1);
  }
};

module.exports = mongoConnect;
