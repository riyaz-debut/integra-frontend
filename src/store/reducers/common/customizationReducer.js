import * as actionTypes from "store/constants/commonType";
//import config from './../../config';

export const initialState = {
  isOpen: "dashboard", //for active default menu
  // fontFamily: config.fontFamily,
  // borderRadius: config.borderRadius,
  // navType: config.theme,
  // locale: config.i18n,
  rtlLayout: false, // rtlLayout: config.rtlLayout,
  opened: true,
  isLoader: false,
  redirectURL: "",
  isredirectURL: false,
};

const customizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADER_OPEN:
      return {
        ...state,
        isLoader: true,
      };

    case actionTypes.LOADER_CLOSE:
      return {
        ...state,
        isLoader: false,
      };
    case actionTypes.REDIRECT_TO:
      return {
        ...state,
        //Just set always opposit value of isredirectURL. because use effect will work if value change check code in APP.Js file for redirect
        isredirectURL: !state.isredirectURL,
        redirectURL: action.url,
      };

    default:
      return state;
  }
};

export default customizationReducer;
