const Product = require("../models/product");
const errorHandler = require("../utils/errorHandler");
const ApiFeatures = require("../utils/apiFeatures");
const catchAsyncError = require("../middlewares/catchAsyncError");
const cloudinary = require("cloudinary");

// add a product /api/admin/product
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") images.push(req.body.images);
  else images = req.body.images;
  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    try {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({ public_id: result.public_id, url: result.secure_url });
    } catch (error) {
      console.error(error);
    }
  }
  req.body.user = req.user.id;
  req.body.images = imagesLinks;
  const product = await Product.create(req.body);
  res.status(200).send({
    success: true,
    product,
  });
});

//get all products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;

  res.status(200).send({
    success: true,
    count: products.length,
    productsCount,
    resPerPage,
    products,
  });
});

//get a single product => api/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new errorHandler("Product not found", 404));
  res.status(200).send({
    success: true,
    product,
  });
});

//update a product => api/admin/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send({
      success: false,
      message: "product not found",
    });
  let images = [];
  if (typeof req.body.images === "string") images.push(req.body.images);
  else images = req.body.images;

  let imagesLinks = [];
  const oldImages = req.body.oldImages;
  //if images are empty assign old images to updated product
  if (images.length === 0) {
    imagesLinks = oldImages;
  }
  //if images are not empty delete old ones and upload new one
  else {
    if (oldImages.length > 0) {
      for (let i = 0; i < oldImages.length; i++) {
        try {
          await cloudinary.v2.uploader.destroy(oldImages[i].public_id);
        } catch (error) {
          console.log(error);
        }
      }
    }
    for (let i = 0; i < images.length; i++) {
      try {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  req.body.user = req.user.id;
  req.body.images = imagesLinks;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).send({
    success: true,
    product,
  });
});

//delete a product => api/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).send({
      success: false,
      message: "product not found",
    });

  //deleting images associated
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).send({
    success: true,
    message: "product is deleted",
  });
});

// add a product review /api/review
exports.newProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  let product = await Product.findById(productId);

  const isReviewed =
    product?.Reviews.length > 0
      ? product?.Reviews.find(
          (review) => review.user.toString() === req.user._id.toString()
        )
      : false;

  if (isReviewed) {
    product.Reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.Reviews.push(review);
    product.numOfReviews = product.Reviews.length;
  }
  product.ratings =
    product.Reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.Reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).send({
    success: true,
    product,
  });
});

// get product reviews /api/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  res.status(200).send({
    success: true,
    reviews: product.Reviews,
  });
});

// delete product reviews /api/reviews
exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  const Reviews = product.Reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId.toString()
  );

  const numOfReviews = Reviews.length;

  let ratings = 0;
  if (numOfReviews)
    ratings =
      Reviews.reduce((acc, review) => acc + review.rating, 0) / Reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { Reviews, ratings, numOfReviews },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).send({
    success: true,
  });
});

//get all products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    products,
  });
});
