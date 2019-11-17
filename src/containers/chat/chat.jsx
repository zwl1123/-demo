import React,{Component} from 'react'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component{
  state = {
    content:'',
    isShow:false
  }
  componentWillMount(){
    const emojis = ['😀' ,'😃','🤣','😀' ,'😃','🤣','😀' ,'😃','😄','🤣' ,'😃','🤣','😀' ,'😃'
      ,'😄','😀' ,'🤣','😄','😀' ,'😃','😄','😀' ,'🤣','😄','😀' ,'😃',
      '😄','🤣' ,'😃','😄','🤣' ,'😃','😄','😀' ,'😃','🤣',]
    this.emojis = emojis.map(val=>({text:val}))
  }
  componentDidMount() {
    // 初 始 显 示 列 表
    window.scrollTo(0, document.body.scrollHeight)
    const to = this.props.user._id
    const from = this.props.match.params.userid
    this.props.readMsg(from,to)
  }
  componentDidUpdate () {
  // 更 新 显 示 列 表
    window.scrollTo(0, document.body.scrollHeight) }

      toggleShow = () =>{
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow){
      //异 步 手 动 派 发 resize事 件 , 解 决 表 情 列 表 显 示 的 b u g
      setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0)
    }
  }

  send = () =>{
    //1.先收集表单数据
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content
    //判断内容是否合法
    if(content){
      //点击这个的时候调用异步action更新状态
      this.props.sendMsg({from,to,content})
    }
    //发送完更新状态
    this.setState({
      content:'',
      isShow:false
    })


  }

  render() {
    const {users,chatMsgs} = this.props.chat
    const user = this.props.user
    const meId = user._id
    if(!users[meId]){
      return null
    }
    const targat_id = this.props.match.params.userid
    const chatId = [meId,targat_id].sort().join('_')
    const msgs = chatMsgs.filter( msg => msg.chat_id === chatId)
    const targetHeader = users[targat_id].header
    const targetIcon = targetHeader ? require(`../../assets/images1/${targetHeader}.png`):null
    return (
      <div  id='chat-page'>
        <NavBar
          icon={<Icon type='left'/>}
          className='sticky-top'
          onLeftClick={()=>this.props.history.goBack()}
        >
          {users[targat_id].username}
          </NavBar>
        <List style={{marginTop:50,marginBottom:50}}>
          <QueueAnim type='scale' delay={100}>
            {msgs.map(msg=>{
            if(targat_id === msg.from){ //别人发给我的
              return (
                <Item thumb={targetIcon}  key={msg._id}>
                  {msg.content}
                </Item>)
            }else  {
              return(
                <Item extra='我' className='chat-me' key={msg._id}>
                  {msg.content}
                </Item>)
            }
          })}</QueueAnim>



        </List>
        <div className='am-tab-bar'>
          <InputItem placeholder="请输入"
                     onChange={val=>this.setState({content:val})}
                     value = {this.state.content}
                     extra={ <span>
                       <span onClick={this.toggleShow}  style={{marginRight:10}}>😃</span>
                       <span onClick={this.send}>发送</span>
                     </span> }
                     onFocus={()=>this.setState({isShow:false})}
          />
          {
            this.state.isShow ? (
              <Grid data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => { this.setState({content: this.state.content + item.text}) }} /> ) : null
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg,readMsg}
)(Chat)