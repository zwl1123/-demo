import React,{Component} from "react"
import {Switch,Redirect,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import {getUser} from '../../redux/actions'
import {getRedirectTo} from '../../utils'
import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'

 class Main extends Component{
   // 给组件对象添加属性
   navList = [ // 包含所有导航组件的相关信息数据
     {
       path: '/laoban', // 路由路径
       component: Laoban,
       title: '大神列表',
       icon: 'dashen',
       text: '大神'
     },
     {
       path: '/dashen', // 路由路径
       component: Dashen,
       title: '老板列表',
       icon: 'laoban',
       text: '老板',
     },
     {
       path: '/message', // 路由路径
       component: Message,
       title: '消息列表',
       icon: 'message',
       text: '消息',
     },
     {
       path: '/personal', // 路由路径
       component: Personal,
       title: '用户中心',
       icon: 'personal',
       text: '个人',
     }
   ]

  componentDidMount () {
    const userid = Cookies.get('userid')
    const {user} = this.props
    if(userid && !user._id){
      this.props.getUser()
    }
  }

  render(){
  //   读取cookie的userid,
  const userid = Cookies.get('userid')
  //   如果没有，自动重定向到登陆界面
    if(!userid){
      return <Redirect to='/login'/>
    }
  //   如果有，读取redux的user状态（根据）

	 const {user} = this.props

	// 如果user没有_id,返回null
   if(!user._id){
     return null
   }else {
     //   如果有_id,显示对应的界面
     //   如果请求的是根路径() this.props.location.pathname
     //   根据user的type和header来计算出一个重定向的路径，并自动重定向
     let path = this.props.location.pathname
     const {type,header} = this.props.user
     if(path === '/'){
       path = getRedirectTo(type,header)
       return <Redirect to={path} />
     }
   }


    /*const {_id} = this.props.user
    if(!_id){
      return <Redirect to='/login'/>
    }*/
    const {type} = this.props.user
    if(type === 'laoban'){
      this.navList[1].hide = true
    }else if (type === 'dashen'){
      this.navList[0].hide = true
    }
    const {navList} = this
    let path = this.props.location.pathname
    //找到请求的路径
    const currentNav = navList.find(nav => nav.path === path)
    const {unreadCount} = this.props
    return(
      <div>
        {currentNav ? <NavBar className='sticky-top'>{currentNav.title}</NavBar> : null}
        <Switch>
          {navList.map((nav,index) => <Route path={nav.path} component={nav.component} key={index}/>)}
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/chat/:userid' component={Chat}/>

          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={this.navList} unreadCount={unreadCount}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user,unreadCount:state.chat.unreadCount}),
  {getUser}
)(Main)