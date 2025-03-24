export const initialState = {
    mainPosts:[{
      id : 1,
      User : {
         id : 1,
         nickname :'sally03915'
      } ,
      content : '첫번째 게시글 #해시태그 #익스프레스' ,
      Images:[{
         src:'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201912/17/07712b9e-e451-49c7-a65c-fb94b6dcda0b.jpg'
      },{
         src:'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F05%2Fcc-ma-dong-seok-was-offered-the-role-of-john-wick-01.jpg?q=75&w=800&cbr=1&fit=max'
      }, {
            src:'https://cdn.slist.kr/news/photo/201710/21450_62615_307.jpg'
      }
       ],
      Comments : [{
        User : { nickname:'hero' , } ,
        content: 'hello'
      }, {
        User : { nickname:'first' , } ,
        content: 'wow!'
      }]
   }],
    imagePaths : [] ,
    postAdded : false,
}


const ADD_POST = 'ADD_POST';
export  const  addPost =  {
   type:ADD_POST,
}

const dummyPost = {
   id:2 ,
   conent : '더미데이터' ,
   User : {
      id : 1,
      nickname : 'sally03915' ,
   },
   Images : [],
   Comments : [],
};

const reducer = ( state = initialState, action  ) =>{
   switch(action.type){
      case  ADD_POST :
         return {
            ...state,
            mainPosts : [dummyPost  , ...state.mainPosts ] ,
            postAdded : true
         };
      default :
         return state;
   }
};
export default reducer;