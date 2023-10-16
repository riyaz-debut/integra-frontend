import { combineReducers } from 'redux'

//@@@@@@@@@@@@@@@@ Defalut Theme Reducers @@@@@@@@@@@@@@@@@@@@@@
import customizationReducer from 'store/reducers/common/customizationReducer';
import snackbarReducer from 'store/reducers/common/snackbarReducer';

//@@@@@@@@@@@@@@@@ Our Reducers @@@@@@@@@@@@@@@@@@@@@@
import chainCodeReducer from 'store/reducers/chain-code'
import organisationReducer from 'store/reducers/organisation' 
import userReducer from 'store/reducers/user' 

const rootReducer =  combineReducers({
    customization: customizationReducer,
    snackbar: snackbarReducer,
    chainCode: chainCodeReducer,
    organisation: organisationReducer,
    user: userReducer
})

export default rootReducer;