import types from "store/constants/chainCodeType";
import { all, call, takeLatest, put } from "redux-saga/effects";
// import {apiFailed, allData} from './../../actions/category';
import { get, post, deleteRequest } from "services/ApiService";
import {
  SNACKBAR_OPEN,
  LOADER_OPEN,
  LOADER_CLOSE,
} from "store/actions/common/actions";
import LocalStorageService from "services/LocalStorageService";
import { ADMIN } from "constants/userRoles";

////// NOTE ====> Make sure each WATCHER FUNCTION is imported inside root-saga file

//All category
export function* listing(action) {
  const userRole = LocalStorageService.getUserRole();
  const method = userRole === ADMIN ? post : get;
  // history.push(`category/list`)
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(method, `chaincode/list`);
    //yield put(saveUserData(result));
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
  yield takeLatest(types.ALL_REQUEST, listing);
}

export function* checkUpdate(action) {
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(get, `chaincode/checkforupdates`);
    yield put({ type: types.CHECK_UPDATE, payload: result.data });
    //yield put(saveUserData(result));
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
export function* checkUpdateRequest() {
  yield takeLatest(types.CHECK_UPDATE_REQUEST, checkUpdate);
}

export function* installChainCode(action) {
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(
      post,
      `chaincode/update/${action.payload.chaincode}`
    );
    // yield put({type: types.CHECK_UPDATE, payload: result.data });
    yield put({ type: types.CHAINCODE_INSTALL_STATUS, payload: true });
    yield put({ type: LOADER_CLOSE });
  } catch (error) {
    yield put({ type: types.CHAINCODE_INSTALL_STATUS, payload: false });
    yield put({ type: LOADER_CLOSE });
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* installChainCodeRequest() {
  yield takeLatest(types.INSTALL_CHAINCODE_REQUEST, installChainCode);
}

/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * Admin Code
 */

//Releases Listing
export function* releaseListing(action) {
  // history.push(`category/list`)
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(get, `releases/list`);
    //yield put(saveUserData(result));
    yield put({ type: types.RELEASE_LIST, payload: result.data });
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
export function* releaseListingReq() {
  yield takeLatest(types.RELEASE_LIST_REQUEST, releaseListing);
}

//Releases Listing
export function* deleteRelease(action) {
  // history.push(`category/list`)
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(
      deleteRequest,
      `releases/delete/${action.payload}`
    );
    //yield put(saveUserData(result));
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: result.message,
      alertSeverity: "success",
      variant: "alert",
    });
    yield put({ type: LOADER_CLOSE });
    yield put({ type: types.RELEASE_LIST });
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* deleteReleaseReq() {
  yield takeLatest(types.DELETE_CHAINCODE_REQUEST, deleteRelease);
}

//Releases add
export function* createRelease({ type, payload }) {
  // history.push(`category/list`)
  const navigate = payload.navigate;
  const chainCodeId = payload.chaincode;

  delete payload.navigate;
  delete payload.chainCodeId;

  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(
      post,
      `chaincode/createupdates/${chainCodeId}`,
      payload
    );

    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: result.message,
      alertSeverity: "success",
      variant: "alert",
    });
    // yield put({type: types.RELEASE_LIST, payload: result.data });
    yield put({ type: LOADER_CLOSE });
    navigate("/chaincode/release/list");
  } catch (error) {
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* createReleaseReq() {
  yield takeLatest(types.ADD_NEW_RELEASE_REQUEST, createRelease);
}

//view log

export function* viewReleaseLog(action) {
  // history.push(`category/list`)
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(get, `releases/logs/${action.payload}`);
    yield put({
      type: types.RELEASE_LOG_DATA,
      payload: {
        list: result.data,
        commit_status: result.commit_status,
      },
    });
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
export function* viewReleaseLogReq() {
  yield takeLatest(types.RELEASE_LOG_REQUEST, viewReleaseLog);
}

// chaincode commit

export function* chaincodeCommit(action) {
  // history.push(`category/list`)
  try {
    yield put({ type: LOADER_OPEN });
    // yield put({type: types.DATA_LOADED_STATUS});
    const result = yield call(post, `chaincode/commit`, action.payload);
    yield put({ type: types.COMMIT_CHAINCODE_STATUS, payload: true });
    yield put({ type: LOADER_CLOSE });
    yield put({
      type: SNACKBAR_OPEN,
      open: true,
      message: result.message,
      alertSeverity: "success",
      variant: "alert",
    });
  } catch (error) {
    yield put({ type: types.COMMIT_CHAINCODE_STATUS, payload: false });
    yield put({ type: LOADER_CLOSE });
    if (error.status === 422) {
      return false;
    }
    // yield put({type: SNACKBAR_OPEN, open: true, message: error.data.error.message, alertSeverity: 'error', variant: 'alert'});
  }
}

//Function generator (watcher )
export function* chaincodeCommitReq() {
  yield takeLatest(types.CHAINCODE_COMMIT_REQ, chaincodeCommit);
}

export default function* chainCodeSaga() {
  yield all([
    listingReq(),
    checkUpdateRequest(),
    installChainCodeRequest(),
    releaseListingReq(),
    deleteReleaseReq(),
    createReleaseReq(),
    viewReleaseLogReq(),
    chaincodeCommitReq(),
  ]);
}
