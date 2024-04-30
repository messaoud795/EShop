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
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json());
const swaggerJSDocs = YAML.load("./api.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDocs));
app.use(fileUpload());

//deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
  app.get("*", function (req, res, next) {
    const url = req.originalUrl;
    if (!url.startsWith("/api/")) {
      res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
          res.status(500).send(err);
        }
      );
      return;
    }
    next();
  });
}

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
