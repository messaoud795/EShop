const connectDB = require("./config/database");
const app = require("./app");

// handle unhandled uncaughtException
process.on("uncaughtException", (err) => {
  console.log({ error: err.message });
  console.log("Shutting down the server because of uncaughtException");
  server.close(() => process.exit(1));
});

//connecting to DB
connectDB();

//setting config file for dotenv
PORT = 5000 || process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// handle unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log({ error: err.message });
  // console.log('Shutting down the server because of unhandled rejections');
  // server.close(() => process.exit(1));
});
