import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Loader } from "../layout/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Sidebar from "./Sidebar";

const ProcessOrder = () => {
  const { isUpdated } = useSelector((state) => state.order);
  const { loading, error, orderDetails } = useSelector(
    (state) => state.orderDetails
  );
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const params = useParams();
  const alert = useAlert();
  const [isPaid, setIsPaid] = useState();
  const [address, setAddress] = useState("");

  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      navigate({ pathname: "/admin/orders" });
      alert.success("Order updated Successfully!");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [error, dispatch, params.id, isUpdated, alert, navigate]);

  useEffect(() => {
    if (orderDetails) {
      const { shippingInfo, paymentInfo } = orderDetails;
      setIsPaid(
        paymentInfo && paymentInfo.status === "succeeded" ? true : false
      );

      const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
      setAddress(shippingDetails);
    }
  }, [orderDetails]);

  const updateOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateOrder(orderId, {
        ...orderDetails,
        status,
      })
    );
  };

  return (
    <Fragment>
      <MetaData title={"Process Order" + orderDetails?._id} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 py-5">
          {loading ? (
            <Loader />
          ) : (
            <>
              {orderDetails && (
                <div className="row d-flex justify-content-around">
                  <div className="col-12 col-lg-7 order-details">
                    <h2 className="my-5">Order # {orderId}</h2>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p>
                      <b>Name:</b> {orderDetails?.user?.name}
                    </p>
                    <p>
                      <b>Phone:</b> {orderDetails?.shippingInfo?.phoneNo}
                    </p>
                    <p className="mb-4">
                      <b>Address:</b>
                      {address}
                    </p>
                    <p>
                      <b>Amount:</b> ${orderDetails?.totalPrice}
                    </p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className={isPaid ? "greenColor" : "redColor"}>
                      <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                    </p>

                    <h4 className="my-4">Order Status:</h4>
                    <p
                      className={
                        orderDetails?.orderStatus &&
                        String(orderDetails?.orderStatus).includes("Delivered")
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      <b>{orderDetails?.orderStatus}</b>
                    </p>

                    <h4 className="my-4">Stripe ID</h4>

                    <h4 className="my-4">Order Status:</h4>
                    <p className="greenColor">
                      <b>Delivered</b>
                    </p>

                    <h4 className="my-4">Order Items:</h4>
                    <p>
                      <b>{orderDetails.paymentInfo.id}</b>
                    </p>

                    <hr />
                    <div className="cart-item my-1">
                      {orderDetails?.orderItems &&
                        orderDetails.orderItems.map((item, index) => (
                          <div className="row my-5" key={index}>
                            <div className="col-4 col-lg-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                height="45"
                                width="65"
                              />
                            </div>

                            <div className="col-5 col-lg-5">
                              <Link to={`/products/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>

                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                              <p>${item.price}</p>
                            </div>

                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                              <p>{item.quantity} Piece(s)</p>
                            </div>
                          </div>
                        ))}
                    </div>
                    <hr />
                  </div>

                  <div className="col-12 col-lg-3 mt-5">
                    <h4 className="my-4">Status</h4>

                    <div className="form-group">
                      <select
                        className="form-control"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    <button
                      className="btn btn-primary btn-block"
                      onClick={updateOrderHandler}
                    >
                      Update Status
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
