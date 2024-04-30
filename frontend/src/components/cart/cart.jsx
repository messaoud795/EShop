import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemToCard, removeItemFromCard } from "../../actions/cartActions";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  let navigate = useNavigate();

  const increaseStock = (id, quantity, stock) => {
    const count = quantity + 1;
    if (count >= stock) return;
    dispatch(addItemToCard(id, count));
  };

  const decreaseStock = (id, quantity) => {
    const count = quantity - 1;
    if (count < 1) return;
    dispatch(addItemToCard(id, count));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCard(id));
  };
  const checkoutHandler = () => {
    navigate({ pathname: "/shipping", search: `?redirect=shipping` });
  };
  return (
    <div className="container-fluid">
      <MetaData title={"Your cart"} />
      {cartItems.length === 0 ? (
        <h3 className="mt-5">Your cart is empty</h3>
      ) : (
        <Fragment>
          <h3 className="mt-5">
            Your Cart:
            <b>
              {cartItems.length} {`item ${cartItems.length > 0 ? "s" : ""}`}
            </b>
          </h3>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image}
                          // item.images[0]?.url??
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseStock(item.product, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseStock(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => {
                            removeCartItemHandler(item.product);
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, i) => acc + Number(i.quantity), 0)}{" "}
                    Units
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    {cartItems
                      .reduce((acc, i) => acc + Number(i.quantity) * i.price, 0)
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  onClick={checkoutHandler}
                  className="btn btn-primary btn-block"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
