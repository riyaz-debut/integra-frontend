import types from "store/constants/organisationType";

//Direct update value to redux store
export const listing = () => {
  return {
    type: types.ALL_DATA_REQUEST,
    // payload: data
  };
};

export const create = (data) => {
  return {
    type: types.ADD_REQUEST,
    payload: data,
  };
};

export const checkUpdate = () => {
  return {
    type: types.CHECK_UPDATE_REQUEST,
  };
};

export const installChainCode = (data) => {
  return {
    type: types.INSTALL_CHAINCODE_REQUEST,
    payload: data,
  };
};

export const signChainCodeReq = (id) => {
  return {
    type: types.SIGN_ORGANISATION_REQUEST,
    payload: id,
  };
};

export const joinChannelRequest = (data) => {
  return {
    type: types.JOIN_CHANNEL_REQUEST,
    payload: data,
  };
};

export const AddNewPeerReq = (data) => {
  return {
    type: types.ADD_PEER,
    payload: data,
  };
};
