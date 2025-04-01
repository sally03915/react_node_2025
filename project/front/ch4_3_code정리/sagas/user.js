import { put, all, fork, call, take, takeEvery, takeLatest, throttle, delay } from 'redux-saga/effects';

import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loginApi(data) {    //4.
    return axios.post('/api/login', data);   //5.
}
function* login(action) {//2. 로그인할 데이터 받아서
    try {
        console.log('.... sagas - user.js');
        //const result = yield call(loginApi , action.data);   //3. 처리할함수, 파라미터
        yield delay(1000); //###

        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data
        });
    }
}


function logoutApi() {
    return axios.post('/api/logout');
}

function* logout() {

    try {
        //const result = yield call(logoutApi);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        });
    }
}
//////////////////////////////////////////////////////
function signUpAPI() {
    return axios.post('/api/signUp');
}

function* signUp() {
    try {
        // const result = yield call(signUpAPI);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function followAPI() {
    return axios.post('/api/follow');
}

function* follow(action) {
    try {
        // const result = yield call(followAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function unfollowAPI() {
    return axios.post('/api/unfollow');
}

function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}



//////////////////////////////////////////////////////

function* watchLogin() {
    //ver-1 여러번 이벤트 실행가능하게
    // while(true){
    //     yield take('LOG_IN_REQUEST' ,login);
    // }
    //ver-2 while 같음. 이벤트 실수로 더블클릭하면 두번들어감.
    // yield  takeEvery('LOG_IN_REQUEST' ,login);

    //ver-3 이벤트 3번하면 요청3번-> 응답 1번.... backend server에 3번저장됨.
    yield takeLatest(LOG_IN_REQUEST, login);

    //ver-4 몇초뒤에 실행하라는 시간설정가능 - 10초뒤에 설정
    //yield throttle('LOG_IN_REQUEST', login , 10000);
}
function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);

}


export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFollow),
        fork(watchUnfollow),
    ]);
}
