/* 对 话 消 息 列 表 组 件 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
/*
我们要得到一个具有所有lastMsgs的数组
[msg1,msg2,msg3]
1.使用chat_id进行分组，保存每个组的最后一条msg {chat_id1: lastMsg1, chat_id2:lastMsg2}
2.得 到 所 有 分 组 的 lastMsg组 成 数 组 : Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
3.按照create_time进行排序
 */
function getLastMsgs(chatMsgs,userid) {
  const lastMsgsObj = {}
  //chatMsgs是一个数组
  chatMsgs.forEach(msg =>{
    //对msg进行个体的统计
    if(msg.to === userid && !msg.read){
      msg.unreadCount = 1
    }else {
      msg.unreadCount = 0
    }

    const chatId = msg.chat_id
    const lastMsg = lastMsgsObj[chatId]
    if (!lastMsg){
      //没有值，发对象里的属性值变成
      lastMsgsObj[chatId] = msg
    } else {
      //保存已经统计的未读数量
      const unreadCount = lastMsg.unreadCount
      //这个的话一开始为0或者1，为什么在这个地方呢?因为下面的话lastMsg发生改变
      //有值进行排序
      if(msg.create_time>lastMsg.create_time){
        lastMsgsObj[chatId] = msg
      }
      //并且刚刚传了一个msg过来，因为lastMsg刚刚发生改变，所以将
      lastMsgsObj[chatId].unreadCount = unreadCount + msg.unreadCount
    }
  })
  const lastMsgs = Object.values(lastMsgsObj)
  lastMsgs.sort(function (msg1, msg2) {
    return msg2.create_time - msg1.create_time
  })
  return lastMsgs
}

class Message extends Component {
  render() {
    const user = this.props.user
    const {chatMsgs,users} = this.props.chat
    const lastMsgs = getLastMsgs(chatMsgs,user._id)  //lastMsgs = [msg1,msg2,msg3]

    //users你要知道对应的_id,你才知道相应的header

    return (
      <List style={{marginBottom: 50,marginTop:50}}>
        {lastMsgs.map((msg,index)=>{
          const targetUserId = msg.from===user._id ? msg.to : msg.from  //其实都是我发的，
          const targetUser = users[targetUserId]
          return (
            <Item
            key={index}
            extra={<Badge text={msg.unreadCount}/>}
            thumb={targetUser.header?require(`../../assets/images1/${targetUser.header}.png`):null}
            arrow='horizontal'
            onClick = {()=>this.props.history.push(`/chat/${targetUserId}`)}
          > {msg.content}
            <Brief>{targetUser.username}</Brief>
          </Item>)
        })}

      </List> ) }
}

export default connect(
  state=>({user:state.user,chat:state.chat})
)(Message)