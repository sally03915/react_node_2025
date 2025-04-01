import { all, fork, call ,take, takeEvery , takeLatest, throttle , delay} from 'redux-saga/effects';

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}
