import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../actions/productActions';
import { Loader } from '../layout/Loader';
import { updatePassword } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

export const UpdatePassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { error, isUpdated, loading } = useSelector(state => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (isUpdated) {
      alert.success('Password updated successfully');
      navigate('/me');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword }));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Change Password'} />
          <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
              <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mt-2 mb-5'>Update Password</h1>
                <div className='form-group'>
                  <label htmlFor='old_password_field'>Old Password</label>
                  <input
                    type='password'
                    id='old_password_field'
                    className='form-control'
                    value={oldPassword}
                    onChange={e => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='new_password_field'>New Password</label>
                  <input
                    type='password'
                    id='new_password_field'
                    className='form-control'
                    value={newPassword}
                    onChange={e => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  type='submit'
                  className='btn update-btn btn-block mt-4 mb-3'
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
