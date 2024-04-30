import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deletReviewReducer,
  manageProductReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  reviewsReducer,
} from "./reducers/productReducers";
import {
  allUsersReducer,
  authReducer,
  forgotPasswordReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  OrderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrdersReducer,
  orderDetails: OrderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: manageProductReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  reviews: reviewsReducer,
  review: deletReviewReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
