import { all, fork, call ,take, takeEvery , takeLatest, throttle , delay} from 'redux-saga/effects';

function loginApi(data){    //4.
    return axios.post('/api/login' , data);   //5.
}
//6. 테스트 할때 편하다.
//const l = login({ type: 'LOG_IN_REQUEST' , data:{id:'sally@gmail.com' }});
//l.next();   실행시 yield call(loginApi , action.data);  부분까지만 실행
//l.next();
function* login(action){//2. 로그인할 데이터 받아서
    try{
        //const result = yield call(loginApi , action.data);   //3. 처리할함수, 파라미터
        yield delay(1000); //###

        yield put({
            type : 'LOG_IN_SUCCESS' ,
            data : result.data
        });
    }catch(err){
        yield put({
        type : 'LOG_IN_FAILURE' ,
        data : err.response.data
        });
    }
}


function logoutApi(){
    return axios.post('/api/logout');
}

function* logout(){

    try{
        //const result = yield call(logoutApi);
        yield delay(1000);
        yield put({
        type : 'LOG_OUT_SUCCESS' ,
        data : result.data
        });
    }catch(err){
        yield put({
        type : 'LOG_OUT_FAILURE' ,
        data : err.response.data
        });
    }
}

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


function* watchLogin() {
    //ver-1 여러번 이벤트 실행가능하게
    // while(true){
    //     yield take('LOG_IN_REQUEST' ,login);
    // }
    //ver-2 while 같음. 이벤트 실수로 더블클릭하면 두번들어감.
    // yield  takeEvery('LOG_IN_REQUEST' ,login);

    //ver-3 이벤트 3번하면 요청3번-> 응답 1번.... backend server에 3번저장됨.
    yield takeLatest('LOG_IN_REQUEST', login);

    //ver-4 몇초뒤에 실행하라는 시간설정가능 - 10초뒤에 설정
    //yield throttle('LOG_IN_REQUEST', login , 10000);
}
function* watchLogout(){
    yield takeLatest('LOG_OUT_REQUEST' , logout );

}
function* watchAddPost(){
    yield takeLatest('ADD_POST_REQUEST' , addpost );
}

export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchAddPost),
    ]);
}
