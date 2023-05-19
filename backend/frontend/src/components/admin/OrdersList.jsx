import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/productActions";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { deleteOrder, getAllOrders } from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const alert = useAlert();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order deleted Successfully!");
      navigate({ pathname: "/admin/orders" });
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [error, dispatch, alert, navigate, isDeleted, deleteError]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const setOrders = () => {
    const data = {
      columns: [
        { label: "Id", field: "id", sort: "asc" },
        { label: "No items", field: "numItems", sort: "asc" },
        { label: "Amount", field: "amount", sort: "asc" },
        { label: "Status", field: "status", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numItems: order.orderItems.length,
        amount: order.totalPrice,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn danger py-1 px-2 ml-2"
              onClick={() => {
                deleteOrderHandler(order._id);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 py-5">
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
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
