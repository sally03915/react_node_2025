//step1) 초기값
const initialState = {
   name : 'sally' ,    age  : 20 ,    password : '1234',
};
// step2) 이름이 바뀔때마다 설정해주는 함수
const changeNickname = (data)=>{
   return{
      type :'CHANGE_NICKNAME' ,
      data ,
   }
};
changeNickname('sally03915');
//{  type : 'CHANGE_NICKNAME'
//   data : 'sally03915'
//}
// store. dispatch(changeNickname('sally03915'))
//step3)
// (이전상태 , 액션) => 다음상태
const rootReducer = (state=initialState , action)=> {
   switch(action.type){
      case 'CHANGE_NICKNAME' :
         return  {
            ...state ,
            name : action.data
         }
   }
};
export default rootReducer;