import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { loading, error, orderDetails } = useSelector(
    (state) => state.orderDetails
  );
  const [isPaid, setIsPaid] = useState();
  const [address, setAddress] = useState("");
  const params = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(params.id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, params.id]);

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

  return (
    <Fragment>
      <MetaData title={"Order Details"} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div
            className="row d-flex justify-content-between"
            style={{ padding: "0 40px" }}
          >
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderDetails?._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b>
                {orderDetails && orderDetails.user.name}
              </p>
              <p>
                <b>Phone:</b>{" "}
                {orderDetails && orderDetails.shippingInfo.phoneNo}
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

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderDetails?.orderItems &&
                  orderDetails.orderItems.map((item) => (
                    <div className="row my-5">
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
