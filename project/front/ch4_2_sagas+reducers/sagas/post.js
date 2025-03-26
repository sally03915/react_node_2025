import { put ,all, fork, call ,take, takeEvery , takeLatest, throttle , delay} from 'redux-saga/effects';

function addpostApi( data ){
    return axios.post('/api/post');
}

function* addpost(action){
    try{
        //const result = yield call(addpostApi , action.data);
         yield delay(1000);
        yield put({
        type : 'ADD_POST_SUCCESS' ,
        data : result.data
        });
    }catch(err){
        yield put({
        type : 'ADD_POST_FAILURE' ,
        data : err.response.data
        });
    }
}

function* watchAddPost(){
    yield takeLatest('ADD_POST_REQUEST' , addpost );
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ]);
}
