import { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearErrors } from "../../actions/productActions";
import { getUserDetails, updateUser } from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { Loader } from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { loading, error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  let navigate = useNavigate();
  const userId = params.id;

  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user?._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      const { name, email, role } = user;
      setData({ name, email, role });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate({ pathname: "/admin/users" });
      alert.success("User updated Successfully!");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [error, dispatch, navigate, alert, isUpdated, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, data));
  };
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <MetaData title={"Update User"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 py-5">
          {loading ? (
            <Loader />
          ) : (
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mt-2 mb-5">Update User</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="name"
                      value={data.name}
                      onChange={handleOnChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      name="email"
                      value={data.email}
                      onChange={handleOnChange}
                    />
                  </div>

                  <div className="form-group">
                    <label for="role_field">Role</label>

                    <select
                      id="role_field"
                      className="form-control"
                      name="role"
                      value={data.role}
                      onChange={handleOnChange}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
