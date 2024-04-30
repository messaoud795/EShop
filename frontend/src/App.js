import { React, useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductDetails } from "./components/product/ProductDetails";
import { Login } from "./components/user/Login";
import { Register } from "./components/user/Register";
import { loadUser } from "./actions/userActions";
import store from "./store";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/route/ProtectedRoute";
import { UpdateProfile } from "./components/user/UpdateProfile";
import { UpdatePassword } from "./components/user/UpdatePassword";
import { ForgotPassword } from "./components/user/ForgotPassword";
import { NewPassword } from "./components/user/NewPassword";
import Cart from "./components/cart/cart";
import Shipping from "./components/cart/shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import { useSelector } from "react-redux";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/product/:id" element={<ProductDetails />} exact />
          <Route path="/search" element={<Home />} exact />
          <Route path="/cart" element={<Cart />} exact />

          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<NewPassword />}
          />
          {loading === false && (
            <>
              <Route
                exact
                path="/me"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/me/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/password/update"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin/order/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <ProcessOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/orders/me"
                element={
                  <ProtectedRoute>
                    <ListOrders />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/dashboard"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin/products"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <ProductsList />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/admin/users"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/admin/product/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/admin/product"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <NewProduct />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin/orders"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <OrdersList />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/admin/user/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateUser />
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/admin/reviews"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <ProductReviews />
                  </ProtectedRoute>
                }
              />
              {stripeApiKey && (
                <Route
                  exact
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                />
              )}
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
