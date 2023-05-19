import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  let navigate = useNavigate();
  const productId = params.id;
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Headphones",
    "Food",
    "books",
    "shoes",
    "sport",
    "home",
  ];
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    category: categories[0],
    stock: 0,
    seller: "",
    images: [],
    oldImages: [],
    imagesPreview: [],
  });

  useEffect(() => {
    if (product?._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      const preview = product.images.reduce(
        (acc, img) => [...acc, img.url],
        []
      );
      setData((data) => ({
        ...data,
        ...product,
        oldImages: product.images,
        imagesPreview: preview,
      }));
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate({ pathname: "/admin/products" });
      alert.success("Product updated Successfully!");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    error,
    dispatch,
    navigate,
    alert,
    isUpdated,
    updateError,
    product,
    productId,
  ]);

  const submitHandler = (e) => {
    const {
      name,
      description,
      category,
      stock,
      seller,
      images,
      oldImages,
      price,
    } = data;
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name,
        description,
        price,
        category,
        stock,
        seller,
        images,
        oldImages,
      })
    );
  };
  const handleOnChange = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      setData({ ...data, images: [], imagesPreview: [] });
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setData((data) => ({
              ...data,
              images: [...data.images, reader.result],
              imagesPreview: [...data.imagesPreview, reader.result],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  return (
    <Fragment>
      <MetaData title={"Update Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 py-5">
          {loading ? (
            <Loader />
          ) : (
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    name="price"
                    value={data.price}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    name="description"
                    value={data.description}
                    onChange={handleOnChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    name="category"
                    value={data.category}
                    onChange={handleOnChange}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="text"
                    id="stock_field"
                    className="form-control"
                    name="stock"
                    value={data.stock}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    name="seller"
                    value={data.seller}
                    onChange={handleOnChange}
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      multiple
                      onChange={handleOnChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>
                  <div>
                    {data.imagesPreview.map((image, index) => (
                      <img
                        src={image}
                        key={index}
                        className="mt-3 mr-2"
                        alt="preview"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading}
                >
                  UPDATE
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
