import {all, fork} from 'redux-saga/effects';
//import { all, call } from 'redux-saga/effects'
//import {createReq, editReq, updateReq, allCategoriesReq, changeStatusReq, deleteReq} from './category/category.saga';
import chainCodeSaga from './chain-code/chainCode.saga';
import organisationSaga from 'store/sagas/organisation/organisation.saga';
import userSaga from 'store/sagas/user/user.saga';

export default function* rootSaga() {
    yield all(
        [
            fork(chainCodeSaga),
            fork(organisationSaga),
            fork(userSaga)

        ]
    );
}
