import {
  All_PRODUCTS_FAIL,
  All_PRODUCTS_REQUESTS,
  All_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCTS_REQUESTS,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productConstants";
import axios from "axios";
import { config } from "./requestHeaderConfig";

export const getProducts =
  (keyword = "", currentPage = 1, price, category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: All_PRODUCTS_REQUESTS });
      keyword = keyword ? keyword : "";
      let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      if (category) {
        link += `&category=${category}`;
      }
      const {
        data: { productsCount, products, resPerPage },
      } = await axios.get(link);
      dispatch({
        type: All_PRODUCTS_SUCCESS,
        payload: { productsCount, products, resPerPage },
      });
    } catch (error) {
      dispatch({
        type: All_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const {
      data: { product },
    } = await axios.get(`/api/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const { data } = await axios.put(`/api/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getADMINProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUESTS });
    const {
      data: { products },
    } = await axios.get("/api/admin/products");
    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,
      payload: { products },
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });
    const {
      data: { product, success },
    } = await axios.post("/api/product/new", data, config);
    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: { product, success },
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/admin/product/${id}`);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (id, newData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const { data } = await axios.put(
      `/api/admin/product/${id}`,
      newData,
      config
    );
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });
    const { data } = await axios.get(`/api/reviews?id=${id}`);
    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });
    const { data } = await axios.delete(
      `/api/review?reviewId=${id}&productId=${productId}`
    );
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
