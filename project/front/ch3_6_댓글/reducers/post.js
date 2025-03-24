export const initialState = {
    mainPosts:[{
      id : 1,
      User : {
         id : 1,
         nickname :'sally03915'
      } ,
      content : '첫번째 게시글 #해시태그 #익스프레스' ,
      Images:[{
         src:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
      },{
         src:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
      },{
         src:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
      }] ,
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