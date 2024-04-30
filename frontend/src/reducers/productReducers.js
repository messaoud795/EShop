import {
  ADMIN_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUESTS,
  ADMIN_PRODUCTS_SUCCESS,
  All_PRODUCTS_FAIL,
  All_PRODUCTS_REQUESTS,
  All_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_RESET,
  NEW_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case All_PRODUCTS_REQUESTS:
      return { loading: true, products: [] };
    case All_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        productsCount: payload.productsCount,
        resPerPage: payload.resPerPage,
      };
    case All_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case ADMIN_PRODUCTS_REQUESTS:
      return { loading: true, products: [] };
    case ADMIN_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload.products,
      };
    case ADMIN_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_REVIEW_REQUEST:
      return { ...state, loading: true };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case NEW_REVIEW_RESET:
      return {
        loading: false,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newProductReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEW_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: payload.success,
        product: payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        loading: false,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const manageProductReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const reviewsReducer = (state = { reviews: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEWS_REQUEST:
      return { ...state, loading: true };
    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: payload,
      };

    case GET_REVIEWS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deletReviewReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        loading: false,
        isDeleted: false,
      };
    case DELETE_REVIEW_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
