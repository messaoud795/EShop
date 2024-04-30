import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { clearErrors } from '../../actions/productActions';
import { forgotPassword } from '../../actions/userActions';
export const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const { error, message, loading } = useSelector(
    state => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  return (
    <Fragment>
      <MetaData title={'Forgot Password'} />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Forgot Password</h1>
            <div className='form-group'>
              <label htmlFor='email_field'>Enter Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <button
              id='forgot_password_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
