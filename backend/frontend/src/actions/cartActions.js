import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const addItemToCard = (id, quantity) => async (dispatch, getState) => {
  const {
    data: {
      product: { name, images, price, stock },
    },
  } = await axios.get(`/api/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: id,
      name,
      image: images[0].url,
      price,
      stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCard = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const SaveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
