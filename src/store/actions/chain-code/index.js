import types from "./../../constants/chainCodeType";

//Direct update value to redux store
export const listing = (data) => {
  return {
    type: types.ALL_REQUEST,
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
/**
 *
 * Admin code
 */
//releasesListing
export const releasesListing = (data) => {
  return {
    type: types.RELEASE_LIST_REQUEST,
    payload: data,
  };
};
export const deleteRelease = (data) => {
  return {
    type: types.DELETE_CHAINCODE_REQUEST,
    payload: data,
  };
};
export const addRelease = (data) => {
  return {
    type: types.ADD_NEW_RELEASE_REQUEST,
    payload: data,
  };
};

export const viewReleaseLogReq = (data) => {
  return {
    type: types.RELEASE_LOG_REQUEST,
    payload: data,
  };
};

export const chaincodeCommitReq = (data) => {
  return {
    type: types.CHAINCODE_COMMIT_REQ,
    payload: data,
  };
};
