import shortId from 'shortid';  //##

export const initialState = {
   mainPosts: [{
      id: 1,
      User: {
         id: 1,
         nickname: 'sally03915'
      },
      content: '첫번째 게시글 #해시태그 #익스프레스',
      Images: [{
         id: shortId.generate(),
         src: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201912/17/07712b9e-e451-49c7-a65c-fb94b6dcda0b.jpg'
      }, {
         id: shortId.generate(),
         src: 'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F05%2Fcc-ma-dong-seok-was-offered-the-role-of-john-wick-01.jpg?q=75&w=800&cbr=1&fit=max'
      }, {
         id: shortId.generate(),
         src: 'https://cdn.slist.kr/news/photo/201710/21450_62615_307.jpg'
      }
      ],
      Comments: [{
         id: shortId.generate(),  //##
         User: {
            id: shortId.generate(), nickname: 'hero',
         },
         content: 'hello'
      }, {
         User: {
            id: shortId.generate(), nickname: 'first',
         },
         content: 'wow!'
      }]
   }],
   imagePaths: [],
   hasMorePosts: true,
   loadPostsLoading: false,
   loadPostsDone: false,
   loadPostsError: null,
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

///////////////////////////////////////////////////
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
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
   //id: shortId.generate(),  //##
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
   id: shortId.generate(),   // ###
   content: data,
   User: {
      id: 1,
      nickname: 'sally',
   },
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
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