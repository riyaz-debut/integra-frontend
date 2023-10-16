import types from "./../../constants/userTypes";

export const loginRequest = (data) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: data,
  };
};

export const userDetail = () => {
  return {
    type: types.DETAIL_REQUEST,
  };
};

export const createUser = (data) => {
  return {
    type: types.ADD_REQUEST,
    payload: data,
  };
};

export const listing = () => {
  return {
    type: types.ALL_USERS_REQUEST,
  };
};

export const enableUser = (data) => {
  return {
    type: types.ENABLE_USER,
    payload: data,
  };
};

export const disableUser = (data) => {
  return {
    type: types.DISABLE_USER,
    payload: data,
  };
};
