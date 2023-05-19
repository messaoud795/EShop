import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_RESET,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isUpdated: payload,
        loading: false,
      };
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
        loading: false,
      };

    case DELETE_ORDER_REQUEST:
      return { ...state, loading: true };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isDeleted: payload,
        loading: false,
      };
    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case MY_ORDERS_SUCCESS:
      return {
        orders: payload,
        loading: false,
      };
    case MY_ORDERS_FAIL:
      return {
        error: payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export const OrderDetailsReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return {
        orderDetails: payload,
        loading: false,
      };
    case ORDER_DETAILS_FAIL:
      return {
        error: payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_ORDERS_REQUEST:
      return { ...state, loading: true };

    case ALL_ORDERS_SUCCESS:
      return {
        orders: payload.orders,
        totalAmount: payload.totalAmount,
        loading: false,
      };
    case ALL_ORDERS_FAIL:
      return {
        error: payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
};
