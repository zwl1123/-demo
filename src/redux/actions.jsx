/*包含多个action creater函数的模块,同步的函数系统默认会分发，而异步的action系统懒得理你，自己分发同步的action*/
import {
 AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-types'

import {
 reqRegister,
  reqLogin,
  reqUpdate,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api'

import io from 'socket.io-client'

function initIO(userid,dispatch) {
  //设置条件判断，让这个socket对象只能出现一次
  if(!io.socket){
    //这个函数是创建一个连接对象
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg',function (chatMsg) {
      console.log('客户端接收服务器发送的信息',chatMsg)
      //chatMsg:{from:,to:,content:,chat_id,createTime}
      //如果当chatMsg与当前用户相关的信息，才会去分发同步action来保存数据，
      if(userid === chatMsg.from || userid === chatMsg.to){
        dispatch(receive_msg(chatMsg,userid))
      }
    })
  }

}
//发送信息的action
export const sendMsg = ({from,to,content}) =>{
  return dispatch =>{
    //这里发的并不是ajax请求，而是socket.io里面的
    console.log('客户端向服务器发送信息',{from,to,content})
    //发消息
    io.socket.emit('sendMsg',{from,to,content})
  }
}
//同步的action
 const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user})
 const error_msg = (msg) =>({type:ERROR_MSG,data:msg})
 const receive_user = (user) =>({type:RECEIVE_USER,data:user})
export const reset_user = (msg) =>({type:RESET_USER,data:msg})
 const receive_user_list = (userlist) =>({type:RECEIVE_USER_LIST,data:userlist})
 const receive_msg_list = ({users,chatMsgs,userid}) =>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
 const receive_msg = (chatMsg,userid) =>({type:RECEIVE_MSG,data:{chatMsg,userid}})
 const msg_read = ({count,from,to}) =>({type:MSG_READ,data:{count,from,to}})

//异步获取消息列表数据，在三个状态下调用register，login，getUser
 async function getMsgList(userid,dispatch){
   initIO(userid,dispatch)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code === 0){
    const {users,chatMsgs} = result.data
    dispatch(receive_msg_list({users,chatMsgs,userid}))
  }
}

//注册一个登陆异步的action
export const register = (user)=>{
  const {username,password,password2,type} = user
  if(!username){
    return error_msg('请输入用户名')
  }
  if (password !== password2){
    return error_msg('两次密码要一致')
  }
  return async dispatch=>{
   /*const promise = reqRegister(user)
    promise.then(response=>{
      const result = response.data  //返回的数据是{code：0/1，user/msg}
    })*/
   //调用
    const respond =await reqRegister({username,password,type})
    const result = respond.data
    if(result.code===0){
      getMsgList(result.data._id,dispatch)
     //拿到数据之后，分发同步的action
     dispatch(authSuccess(result.data))
    }else {
      dispatch(error_msg(result.msg))
    }
  }
}
//注册一个登陆异步的action
export const login = (user)=>{
  const {username,password} = user
  if(!username){
    return error_msg('请输入用户名')
  }else if (!password ){
    return error_msg('请输入密码')
  }
  return async dispatch=>{
    /*const promise = reqLogin(user)
     promise.then(response=>{
       const result = response.data  //返回的数据是{code：0/1，user/msg}
     })*/
    //调用
    const respond =await reqLogin(user)
    const result = respond.data
    if(result.code===0){ //成功
      getMsgList(result.data._id,dispatch)
      dispatch(authSuccess(result.data))
    }else { //失败
      dispatch(error_msg(result.msg))
    }
  }
}
//注册一个更新的异步action
export const updateUser = (user)=>{
  //同步返回一个对象，异步返回一个函数，dispatch是参数
  return async dispatch=>{
    const respond =await reqUpdate(user)
    const result = respond.data
    if(result.code === 1){
      dispatch(reset_user(result.msg))
    }else if(result.code === 0){
      dispatch(receive_user(result.data))
    }
  }
}
//注册一个获取用户的异步action
export const getUser = ()=>{
  return async dispatch=>{
    const response = await reqUser()
    const result = response.data
    if(result.code === 1){
      dispatch(reset_user(result.msg))
    } else if (result.code === 0){
      getMsgList(result.data._id,dispatch)
      dispatch(receive_user(result.data))
    }
  }
}
//获取userlist的异步action
export const getUserList = (type) =>{
  //得到数据
  return async dispatch=>{
    const response = await reqUserList(type)
    const result = response.data
  //分发一个同步的action
    if(result.code === 0){
      dispatch(receive_user_list(result.data))
    }
  }
}

export const readMsg = (from,to) =>{
  return async dispatch =>{
    const response = await reqReadMsg(from)
    const result = response.data
    if(result.code === 0){
      //请求成功发送一个同步action
      const count = result.data
      dispatch(msg_read({count,from,to}))
    }
  }
}

