//包含多个用于生成新的state的reducer函数对象

import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  MSG_READ
} from './action-types'
import {getRedirectTo} from '../utils'

const initUser={
  username:'',
  type:'',
  msg:''
}
function user(state=initUser,action) {

   switch (action.type) {
     case AUTH_SUCCESS:
       const {type,header} = action.data
       return {...action.data,redirectTo:getRedirectTo(type,header)}
     case ERROR_MSG:
       return {...state,msg:action.data}
     case RECEIVE_USER://返回的状态是什么呢？返回的状态是data，因为data在后台已经经过包装，变成成拥有所有属性的变量
       return action.data
     case RESET_USER:
       //因为他要返回登录界面，所以要对数据进行重置
       return {...initUser,msg:action.data}
     default:
       return state
   }
 }
 const initUserList = []
 function userlist(state=initUserList,action) {
   switch (action.type) {
     case RECEIVE_USER_LIST:
       return action.data
     default:
       return state
   }
 }
 const initChat = {
   users:{},
   chatMsgs:[],
   unreadCount:0  //总的未读数量
 }
 function chat(state=initChat,action) {
    switch (action.type) {
      case RECEIVE_MSG_LIST:
        const {users,chatMsgs,userid} = action.data
        return  {
          users,
          chatMsgs,
          unreadCount: chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read && msg.to===userid?1:0),0)
        }
      case RECEIVE_MSG:
        //监听，当发送信息的时候，chatMsg发生改变，如果chatMsg和自己有关，更新状态
        const {chatMsg} = action.data
        return{
          users:state.users,
          chatMsgs:[...state.chatMsgs,chatMsg],
          unreadCount: state.unreadCount + (!chatMsg.read && chatMsg.to===action.data.userid?1:0)
        }
       case MSG_READ:
         const {count,from,to} = action.data
         return{
           users:state.users,
           chatMsgs:state.chatMsgs.map(msg=>{
             if(msg.from === from && msg.to === to && !msg.read){
               return {...msg,read:true}
             }else {
               return msg
             }
           }),  //修改这个里面的值为read的值为false
           unreadCount: state.unreadCount - count
         }
      default:
        return state
    }
 }

export default combineReducers({
  user,
  userlist,
  chat
})

