import type from "store/constants/chainCodeType";

const initialState = {
  listingData: [],
  total_count: 0,
  updateList: [],
  releaseLog: {},
  releasesList: [],
  chainCodeInstallStatus: false,
  commitChaincodeStatus: false,
};

const chainCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ALL_DATA:
      return {
        ...state,
        listingData: action.payload,
        // total_count: action.payload.total_count,
      };

    case type.CHECK_UPDATE:
      return {
        ...state,
        updateList: action.payload,
        // total_count: action.payload.total_count,
      };

    case type.RELEASE_LIST:
      return {
        ...state,
        releasesList: action.payload,
        // total_count: action.payload.total_count,
      };
    case type.RELEASE_LOG_DATA:
      return {
        ...state,
        releaseLog: action.payload,
      };
    case type.CHAINCODE_INSTALL_STATUS:
      return {
        ...state,
        chainCodeInstallStatus: action.payload,
      };

    case type.COMMIT_CHAINCODE_STATUS:
      return {
        ...state,
        commitChaincodeStatus: action.payload,
      };

    default:
      return state;
  }
};

export default chainCodeReducer;
