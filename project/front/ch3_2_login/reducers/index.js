import { HYDREATE } from 'next-redux-wrapper';

//step1) 초기값
const initialState = {
   user : {
      isLoggedIn : false ,
      user : null,
      signUpData : {} ,
      loginData:{}
   } ,
   post : {
      mainPosts:[],
   }
};
// step2) 로그인할대마다 바뀔때마다 설정해주는 함수
export const loginAction = (data)=>{
   return{
      type :'LOG_IN' ,
      data ,
   }
};
export const logoutAction = {
      type :'LOG_OUT' ,
};
//step3)
// (이전상태 , 액션) => 다음상태
const rootReducer = (state=initialState , action)=> {
   switch (action.type) {
      case HYDREATE:
         console.log('HYDRATE' , action);
         return { ...state , ...action.payload };
      case 'LOG_IN':
      return {
         ...state,
         user: {
            ...state.user,
            isLoggedIn: true,
            user: action.data,
         }
      }
      case 'LOG_OUT':
      return {
         ...state,
         user: {
            ...state.user,
            isLoggedIn: false,
            user: null,
         }
      }
      default: return {
         ...state
      }
   }
};

export default rootReducer;