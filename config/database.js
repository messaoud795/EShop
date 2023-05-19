const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config.env" });

const connectDB = () => {
  mongoose.set("strictQuery", false);

  try {
    mongoose.connect(process.env.MongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // dbName: "shopit",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
