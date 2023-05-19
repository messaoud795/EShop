import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/productActions";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { deleteUser, getAllUsers } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector((state) => state.user);
  const alert = useAlert();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("User deleted Successfully!");
      navigate({ pathname: "/admin/users" });
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [error, dispatch, alert, navigate, deleteError, isDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        { label: "Id", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions" },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn danger py-1 px-2 ml-2"
              onClick={() => {
                deleteUserHandler(user._id);
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
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 py-5">
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setUsers()}
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

export default UsersList;
