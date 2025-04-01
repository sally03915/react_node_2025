   export const initialState = {
      isLoggingIn: false,   //로그인 시도중  - 로딩창 띄우기
      isLoggedIn : false ,
      isLoggingOut: false,  //로그아웃 시도중  - 로딩창 띄우기
      me : null,
      signUpData : {} ,
      loginData:{}
   };

   export const loginRequestAction = (data)=>{
      return{
         type :'LOG_IN_REQUEST' ,
         data ,
      }
   };


   export const logoutRequestAction = ()=>{
      return{
         type :'LOG_OUT_REQUEST' ,
      }
   };


   export default (state = initialState, action) => {

      switch (action.type) {
         case 'LOG_IN_REQUEST':
               console.log('.... reducers - user.js');
               return {
                  ...state,
                  isLoggingIn: true,  //##
               };
         case 'LOG_IN_SUCCESS':
               return {
                  ...state,
                  isLoggingIn: false,  //##
                  isLoggedIn: true,
                  me: { ...action.data ,  nickname:'sally' },
               };
         case 'LOG_IN_FAILURE':
               return {
                  ...state,
                  isLoggingIn: false,  //##
                  isLoggedIn: false,
               };
         case 'LOG_OUT_REQUEST':
               return {
                  ...state,
                  isLoggingOut: true,
               };
         case 'LOG_OUT_SUCCESS':
               return {
                  ...state,
                  isLoggingOut:false,
                  isLoggedIn: false,
                  me: null,
               };
         case 'LOG_OUT_FAILURE':
               return {
                  ...state,
                  isLoggingOut:false,
               };
         default: {
               return {
                  ...state,
               }
         }
      }
   };