/*
用户列表的UI组件
 */

import React,{Component} from 'react'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'
import {withRouter} from 'react-router-dom'
import {Card,WingBlank,WhiteSpace} from 'antd-mobile'

const Header = Card.Header
 class UserList extends Component{
  static propTypes = {
    userlist:PropTypes.array.isRequired
  }
  render(){
    const userlist = this.props.userlist

    return(

    <WingBlank  style={{marginTop:50,marginBottom:50}}>
      <QueueAnim  type='scale' delay={100}>
        {userlist.map(user=>(
          <div key={user._id} onClick={()=>{this.props.history.push(`/chat/${user._id}`)}}>
            <WhiteSpace/>
            <Card>
              <Header thumb={user.header ? require(`../../assets/images1/${user.header}.png`):null}
                      extra={user.username }
              />
              <Card.Body>
                <div>职位：{user.post}</div>
                {user.company?<div>公司：{user.company}</div>:null}
                {user.salary?<div>月薪：{user.salary}</div>:null}
                <div>描述：{user.info}</div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </QueueAnim>

    </WingBlank>
    )
  }
}

export default withRouter(UserList)
