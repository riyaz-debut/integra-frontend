import type from "store/constants/userTypes";

const initialState = {
  user: {},
  isLoginSuccess: false,
  userRole: "",
  listingData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        ...state,
        isLoginSuccess: action.payload,
      };

    case type.DETAIL_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case type.USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
    case type.ALL_DATA:
      return {
        ...state,
        listingData: action.payload,
      };
    case type.RESET_USER_STATE:
      return {
        ...state,
        user: {},
        isLoginSuccess: false,
      };

    default:
      return state;
  }
};

export default userReducer;
