import Types from "store/constants/chainCodeType";
import type from "store/constants/organisationType";

const initialState = {
  listingData: [],
  total_count: 0,
  updateList: [],
};

const organisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ALL_DATA:
      return {
        ...state,
        listingData: action.payload,
      };

    case type.ADD:
      return {
        ...state,
        loaded: true,
        loading: false,
        errors: [],
      };
    case Types.ADD_ORG_STATUS:
      return {
        ...state,
        addOrgStatus: action.payload,
      };
    default:
      return state;
  }
};

export default organisationReducer;
