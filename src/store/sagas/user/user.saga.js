import types from "store/constants/userTypes";
import { all, call, takeLatest, put } from "redux-saga/effects";
// import {apiFailed, allData} from './../../actions/category';
import LocalStorageService from "services/LocalStorageService";
import { get, post } from "services/ApiService";
import {
  SNACKBAR_OPEN,
  LOADER_OPEN,
  LOADER_CLOSE,
} from "store/actions/common/actions";

// import history from 'store/redirect/history';
////// NOTE ====> Make sure each WATCHER FUNCTION is imported inside root-saga file

//Login
export function* login(action) {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(post, "user/login", action.payload);
    LocalStorageService.setToken(result.data);
    LocalStorageService.setUserRole(result.role);
    //yield put(saveUserData(result));
    yield put({ type: types.USER_ROLE, payload: result.role });
    yield put({ type: types.LOGIN, payload: true });
    yield put({ type: LOADER_CLOSE });
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: result.message,
      alertSeverity: "success",
      variant: "alert",
    });
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
    }
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: error?.message,
      alertSeverity: "error",
      variant: "alert",
    });
  }
}

//Function generator (watcher )
export function* loginRequest() {
  yield takeLatest(types.LOGIN_REQUEST, login);
}

//User Info
export function* detail(action) {
  try {
    yield put({ type: LOADER_OPEN });
    const result = yield call(get, "user/home");
    yield put({ type: types.DETAIL_DATA, payload: result.data });
    yield put({ type: LOADER_CLOSE });
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: result.message,
      alertSeverity: "success",
      variant: "alert",
    });
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
    }
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: error.data.error.message,
      alertSeverity: "error",
      variant: "alert",
    });
  }
}

//Function generator (watcher )
export function* detailRequest() {
  yield takeLatest(types.DETAIL_REQUEST, detail);
}

// list users

export function* listing() {
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(get, "user/list");
    yield put({ type: types.ALL_DATA, payload: result.data });
    yield put({ type: LOADER_CLOSE });
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* listingReq() {
  yield takeLatest(types.ALL_USERS_REQUEST, listing);
}

// ENABLE USER

export function* enableUser(action) {
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(post, `enable/user/${action.payload}`);
    yield put({ type: types.ALL_USERS_REQUEST });
    yield put({ type: LOADER_CLOSE });
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* enableUserReq() {
  yield takeLatest(types.ENABLE_USER, enableUser);
}

// DISBALE USER
export function* disableUser(action) {
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(post, `disable/user/${action.payload}`);
    yield put({ type: types.ALL_USERS_REQUEST });
    yield put({ type: LOADER_CLOSE });
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* disableUserReq() {
  yield takeLatest(types.DISABLE_USER, disableUser);
}

// CREATE NEW USER

export function* createNewUser({ type, payload }) {
  const navigate = payload.navigate;
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(post, `user/register`, payload.data);

    yield put({ type: LOADER_CLOSE });
    navigate("/user-management");
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* createUserReq() {
  yield takeLatest(types.ADD_REQUEST, createNewUser);
}

export default function* userSaga() {
  yield all([
    loginRequest(),
    detailRequest(),
    listingReq(),
    enableUserReq(),
    disableUserReq(),
    createUserReq(),
  ]);
}
