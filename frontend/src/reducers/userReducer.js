import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  NEW_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";

export function authReducer(state = { user: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { loading: true, isAuthenticated: false };
    case LOGIN_SUCCESS:
      return { loading: false, isAuthenticated: true, user: payload };
    case LOGIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case REGISTER_REQUEST:
      return { loading: true, isAuthenticated: false };
    case REGISTER_SUCCESS:
      return { loading: false, isAuthenticated: true, user: payload };
    case REGISTER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case LOAD_USER_REQUEST:
      return { loading: true, isAuthenticated: false };
    case LOAD_USER_SUCCESS:
      return { loading: false, isAuthenticated: true, user: payload };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export function userReducer(state = { user: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, isUpdated: payload };
    case UPDATE_PROFILE_RESET:
      return { ...state, isUpdated: false };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PASSWORD_SUCCESS:
      return { ...state, loading: false, isUpdated: payload };
    case UPDATE_PASSWORD_RESET:
      return { ...state, isUpdated: false };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, isUpdated: payload };
    case UPDATE_USER_RESET:
      return { ...state, isUpdated: false };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, isDeleted: payload };
    case DELETE_USER_RESET:
      return { ...state, isDeleted: false };
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

export function forgotPasswordReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
      return { ...state, error: null, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: payload };
    case NEW_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: payload };
    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export function allUsersReducer(state = { users: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export function userDetailsReducer(state = { user: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
