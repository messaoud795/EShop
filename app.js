const express = require("express");
const cookieParser = require("cookie-parser");
const products = require("./routes/productsRouter");
const auth = require("./routes/authRouter");
const order = require("./routes/orderRouter");
const payment = require("./routes/paymentRouter");
const errorMiddleware = require("./middlewares/error");
const cloudinary = require("cloudinary");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

//deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./frontend/build/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/api", products);
app.use("/api", auth);
app.use("/api", order);
app.use("/api", payment);

//setting up cloudinay config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
