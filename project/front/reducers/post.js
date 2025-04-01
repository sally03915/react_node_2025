import shortId from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';
faker.seed(123);

export const initialState = {
   mainPosts: [], //##1
   imagePaths: [],
   hasMorePosts: true,  //##6 데이터가 맨처음에 있는지 확인하고 있으면 가져오기 체크
   loadPostsLoading: false, //##4
   loadPostsDone: false, //##4
   loadPostsError: null, //##4
   addPostLoading: false,
   addPostDone: false,
   addPostError: null,
   removePostLoading: false,
   removePostDone: false,
   removePostError: null,
   addCommentLoading: false,
   addCommentDone: false,
   addCommentError: null,
}

/////  10개씩 무한스크롤 부르는 메서드
export const generateDummyPost = (number) => Array(number).fill().map(() => ({  //##2
   id: shortId.generate(),
   User: {
      id: shortId.generate(),
      nickname: faker.internet.username(),
   },
   content: faker.lorem.paragraph(),
   Images: [{
      src: faker.image.avatar(),
   }],
   Comments: [{
      User: {
         id: shortId.generate(),
         nickname: faker.internet.username(),
      },
      content: faker.lorem.sentence(),
   }],
}));

//initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));   //##3

///////////////////////////////////////////////////
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';  //##3
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

///////////////////////////////////////////////////
/*

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
  Comments: [{
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }],
}));

*/

export const addPost = (data) => ({
   type: ADD_POST_REQUEST,
   data,
});

export const addComment = (data) => ({
   type: ADD_COMMENT_REQUEST,
   data,
});

const dummyPost = (data) => ({
   //id: 2,
   //id: shortId.generate(),
   id: data.id,
   content: data.content,
   User: {
      id: 1,
      nickname: 'sally',
   },
   Images: [],
   Comments: [],
});

const dummyComment = (data) => ({
   //id: 3,
   id: shortId.generate(),
   content: data,
   User: {
      id: 1,
      nickname: 'sally',
   },
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
   switch (action.type) {
      case LOAD_POSTS_REQUEST:  //##5
         draft.loadPostsLoading = true;
         draft.loadPostsDone = false;
         draft.loadPostsError = null;
         break;
      case LOAD_POSTS_SUCCESS:  //##5
         draft.loadPostsLoading = false;
         draft.loadPostsDone = true;
         draft.mainPosts = action.data.concat(draft.mainPosts); //새로운데이터 10개 + 기존데이터에
         //console.log('mainPosts.length', action.data.concat(draft.mainPosts).length);
         draft.hasMorePosts = draft.mainPosts.length < 50;  // 게시물 50개부근만  보이게 체크
         break;
      case LOAD_POSTS_FAILURE:  //##5
         draft.loadPostsLoading = false;
         draft.loadPostsError = action.error;
         break;
      case ADD_POST_REQUEST:
         draft.addPostLoading = true;
         draft.addPostDone = false;
         draft.addPostError = null;
         break;
      case ADD_POST_SUCCESS:
         draft.addPostLoading = false;
         draft.addPostDone = true;
         draft.mainPosts.unshift(dummyPost(action.data));
         break;
      case ADD_POST_FAILURE:
         draft.addPostLoading = false;
         draft.addPostError = action.error;
         break;
      case REMOVE_POST_REQUEST:
         draft.removePostLoading = true;
         draft.removePostDone = false;
         draft.removePostError = null;
         break;
      case REMOVE_POST_SUCCESS:
         draft.removePostLoading = false;
         draft.removePostDone = true;
         draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
         break;
      case REMOVE_POST_FAILURE:
         draft.removePostLoading = false;
         draft.removePostError = action.error;
         break;
      case ADD_COMMENT_REQUEST:
         draft.addCommentLoading = true;
         draft.addCommentDone = false;
         draft.addCommentError = null;
         break;
      case ADD_COMMENT_SUCCESS: {
         const post = draft.mainPosts.find((v) => v.id === action.data.postId);  //게시글찾기
         post.Comments.unshift(dummyComment(action.data.content)); //게시글에 새로운댓글넣기
         draft.addCommentLoading = false;
         draft.addCommentDone = true;
         break;
         // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
         // const post = { ...state.mainPosts[postIndex] };
         // post.Comments = [dummyComment(action.data.content), ...post.Comments];
         // const mainPosts = [...state.mainPosts];
         // mainPosts[postIndex] = post;
         // return {
         //   ...state,
         //   mainPosts,
         //   addCommentLoading: false,
         //   addCommentDone: true,
         // };
      }
      case ADD_COMMENT_FAILURE:
         draft.addCommentLoading = false;
         draft.addCommentError = action.error;
         break;
      default:
         break;
   }
});
export default reducer;
/*
const reducer = (state = initialState, action) => {
   switch (action.type) {
      case LOAD_POSTS_REQUEST:
         return {
            ...state,
            loadPostsLoading: true,
            loadPostsDone: false,
            loadPostsError: null,
         };
      case LOAD_POSTS_SUCCESS:
         return {
            ...state,
            loadPostsLoading: false,
            loadPostsDone: true,
            mainPosts: action.data.concat(mainPosts),
            hasMorePosts: mainPosts.length < 50,
         };
      case LOAD_POSTS_FAILURE:
         return {
            ...state,
            loadPostsLoading: false,
            loadPostsError: action.error,
         };

      case ADD_POST_REQUEST:
         return {
            ...state,
            addPostLoading: true,
            addPostDone: false,
            addPostError: null,
         };

      case ADD_POST_SUCCESS: //##
         return {
            ...state,
            mainPosts: [dummyPost(action.data), ...state.mainPosts],
            addPostLoading: false,
            addPostDone: true,
         };
      case ADD_POST_FAILURE:
         return {
            ...state,
            addPostLoading: false,
            addPostError: action.error,
         };
      case REMOVE_POST_REQUEST:
         return {
            ...state,
            removePostLoading: true,
            removePostDone: false,
            removePostError: null,
         };
      case REMOVE_POST_SUCCESS: //##
         return {
            ...state,
            removePostLoading: false,
            removePostDone: true,
            mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
         };
      case REMOVE_POST_FAILURE:
         return {
            ...state,
            removePostLoading: false,
            removePostError: action.error,
         };
      case ADD_COMMENT_REQUEST:
         return {
            ...state,
            addCommentLoading: true,
            addCommentDone: false,
            addCommentError: null,
         };
      case ADD_COMMENT_SUCCESS: //##
         const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
         const post = { ...state.mainPosts[postIndex] };
         post.Comments = [dummyComment(action.data.content), ...post.Comments];
         const mainPosts = [...state.mainPosts];
         mainPosts[postIndex] = post;
         return {
            ...state,
            mainPosts,
            addCommentLoading: false,
            addCommentDone: true,
         };
      case ADD_COMMENT_FAILURE:
         return {
            ...state,
            addCommentLoading: false,
            addCommentError: action.error,
         };
      default:
         return state;
   }
};

export default reducer;
*/