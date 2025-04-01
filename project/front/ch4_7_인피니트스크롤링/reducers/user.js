import produce from 'immer';  //##

export const initialState = {
   logInLoading: false, // 로그인 시도중
   logInDone: false,
   logInError: null,

   logOutLoading: false, // 로그아웃 시도중
   logOutDone: false,
   logOutError: null,

   signUpLoading: false, // 회원가입 시도중
   signUpDone: false,
   signUpError: null,

   changeNicknameLoading: false, // 닉네임 변경 시도중
   changeNicknameDone: false,
   changeNicknameError: null,


   followDone: false,
   followError: null,

   unfollowLoading: false, // 언팔로우 시도중
   unfollowDone: false,
   unfollowError: null,

   me: null,
   signUpData: {},
   loginData: {},
};

///////////////////////////////////////////////
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';   //##
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';  //##

///////////////////////////////////////////////

const dummyUser = (data) => ({
   ...data,
   nickname: 'sally',
   id: 1,
   Posts: [{ id: 1 }],
   Followings: [{ nickname: 'alpha' }, { nickname: 'banana Lee' }, { nickname: 'coconut zeal' }],
   Followers: [{ nickname: 'alpha' }, { nickname: 'banana Lee' }, { nickname: 'coconut zeal' }],
});

///////////////////////////////////////////////

export const loginRequestAction = (data) => {
   return {
      type: LOG_IN_REQUEST,
      data,
   }
};


export const logoutRequestAction = () => {
   return {
      type: LOG_OUT_REQUEST,
   }
};



const reducer = (state = initialState, action) => produce(state, (draft) => {
   switch (action.type) {
      case LOG_IN_REQUEST:
         draft.logInLoading = true;
         draft.logInError = null;
         draft.logInDone = false;
         break;
      case LOG_IN_SUCCESS:
         draft.logInLoading = false;
         draft.me = dummyUser(action.data);
         draft.logInDone = true;
         break;
      case LOG_IN_FAILURE:
         draft.logInLoading = false;
         draft.logInError = action.error;
         break;
      case LOG_OUT_REQUEST:
         draft.logOutLoading = true;
         draft.logOutError = null;
         draft.logOutDone = false;
         break;
      case LOG_OUT_SUCCESS:
         draft.logOutLoading = false;
         draft.logOutDone = true;
         draft.me = null;
         break;
      case LOG_OUT_FAILURE:
         draft.logOutLoading = false;
         draft.logOutError = action.error;
         break;
      case SIGN_UP_REQUEST:
         draft.signUpLoading = true;
         draft.signUpError = null;
         draft.signUpDone = false;
         break;
      case SIGN_UP_SUCCESS:
         draft.signUpLoading = false;
         draft.signUpDone = true;
         break;
      case SIGN_UP_FAILURE:
         draft.signUpLoading = false;
         draft.signUpError = action.error;
         break;
      case CHANGE_NICKNAME_REQUEST:
         draft.changeNicknameLoading = true;
         draft.changeNicknameError = null;
         draft.changeNicknameDone = false;
         break;
      case CHANGE_NICKNAME_SUCCESS:
         draft.changeNicknameLoading = false;
         draft.changeNicknameDone = true;
         break;
      case CHANGE_NICKNAME_FAILURE:
         draft.changeNicknameLoading = false;
         draft.changeNicknameError = action.error;
         break;
      case ADD_POST_TO_ME:
         draft.me.Posts.unshift({ id: action.data });
         break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: [{ id: action.data }, ...state.me.Posts],
      //   },
      // };
      case REMOVE_POST_OF_ME:
         draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
         break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
      //   },
      // };
      /*
            case FOLLOW_REQUEST:
               draft.followLoading = true;
               draft.followError = null;
               draft.followDone = false;
               break;
            case FOLLOW_SUCCESS:
               draft.followLoading = false;
               draft.me.Followings.push({ id: action.data });
               draft.followDone = true;
               break;
            case FOLLOW_FAILURE:
               draft.followLoading = false;
               draft.followError = action.error;
               break;
            case UNFOLLOW_REQUEST:
               draft.unfollowLoading = true;
               draft.unfollowError = null;
               draft.unfollowDone = false;
               break;
            case UNFOLLOW_SUCCESS:
               draft.unfollowLoading = false;
               draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
               draft.unfollowDone = true;
               break;
            case UNFOLLOW_FAILURE:
               draft.unfollowLoading = false;
               draft.unfollowError = action.error;
               break;
      */
      default:
         break;
   }
});
export default reducer;
/*
export default (state = initialState, action) => {
   switch (action.type) {
      case LOG_IN_REQUEST:
         console.log('.... reducers - user.js');
         return {
            ...state,
            logInLoading: true,
            logInError: null,
            logInDone: false,
         };
      case LOG_IN_SUCCESS:
         return {
            ...state,
            logInLoading: false,
            logInDone: true,
            me: dummyUser(action.data)
         };
      case LOG_IN_FAILURE:
         return {
            ...state,
            logInLoading: false,
            logInError: action.error,
         };
      case LOG_OUT_REQUEST:
         return {
            ...state,
            logOutLoading: true,
            logOutError: null,
            logOutDone: false,
         };
      case LOG_OUT_SUCCESS:
         return {
            ...state,
            logOutLoading: false,
            logOutDone: true,
            me: null,
         };
      case LOG_OUT_FAILURE:
         return {
            ...state,
            logOutLoading: false,
            logOutError: action.error,
         };
      /////////////////////////////////////////

      case FOLLOW_REQUEST:
         return {
            ...state,
            followLoading: true,
            followError: null,
            followDone: false,
         };
      case FOLLOW_SUCCESS:
         return {
            ...state,
            followLoading: false,
            me: Followings.push({ id: action.data }),
            followDone: true,
         };

      case FOLLOW_FAILURE:
         return {
            ...state,
            followLoading: false,
            followError: action.error,
         };

      case UNFOLLOW_REQUEST:
         return {
            ...state,
            unfollowLoading: true,
            unfollowError: null,
            unfollowDone: false,
         };

      case UNFOLLOW_SUCCESS:
         return {
            ...state,
            unfollowLoading: false,
            Followings: me.Followings.filter((v) => v.id !== action.data),
            unfollowDone: true,
         };

      case UNFOLLOW_FAILURE:
         return {
            ...state,
            unfollowLoading: false,
            unfollowError: action.error,
         };

      case SIGN_UP_REQUEST:
         return {
            ...state,
            signUpLoading: true,
            signUpError: null,
            signUpDone: false,
         };

      case SIGN_UP_SUCCESS:
         return {
            ...state,

            signUpLoading: false,
            signUpDone: true,
         };
      case SIGN_UP_FAILURE:
         return {
            ...state,
            signUpLoading: false,
            signUpError: action.error,
         };

      case CHANGE_NICKNAME_REQUEST:
         return {
            ...state,
            changeNicknameLoading: true,
            changeNicknameError: null,
            changeNicknameDone: false,
         };
      case CHANGE_NICKNAME_SUCCESS:
         return {
            ...state,
            changeNicknameLoading: false,
            changeNicknameDone: true,
         };
      case CHANGE_NICKNAME_FAILURE:
         return {
            ...state,
            changeNicknameLoading: false,
            changeNicknameError: action.error,

         };
      case ADD_POST_TO_ME: //##
         return {
            ...state,
            me: {
               ...state.me,
               Posts: [{ id: action.data }, ...state.me.Posts],
            },
         };
      case REMOVE_POST_OF_ME:  //##
         return {
            ...state,
            me: {
               ...state.me,
               Posts: state.me.Posts.filter((v) => v.id !== action.data),
            },
         };

      ////////////////////////////////////////
      default: {
         return {
            ...state,
         }
      }
   }
};

*/