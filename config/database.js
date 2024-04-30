const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config.env" });

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(process.env.MongoURI, {
      dbName: "shopit",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
