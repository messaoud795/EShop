import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, myOrder } from "../../actions/orderActions";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";

const ListOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrder());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Order Id", field: "id", sort: "asc" },
        { label: "N° items", field: "numOfItems", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My orders"} />
      <h1 className="m-5">My Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
          noBottomColumns
        ></MDBDataTable>
      )}
    </Fragment>
  );
};

export default ListOrders;
