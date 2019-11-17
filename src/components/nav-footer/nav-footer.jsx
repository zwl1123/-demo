import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item
 class NavFooter extends Component{
  static propTypes = {
    navList:PropTypes.array.isRequired,
    unreadCount:PropTypes.number.isRequired
  }
  render() {
    const navList = this.props.navList.filter(nav => !nav.hide === true)
    const path = this.props.location.pathname
    const unreadCount = this.props.unreadCount
    return (
      <TabBar>
        {navList.map((nav) => (
          <Item key={nav.path}
                badge={nav.path === '/message'?unreadCount:0}
                title={nav.text}
                icon={{uri: require(`./images/${nav.icon}.png`)}}
                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
                selected={path===nav.path}
                onPress={() => this.props.history.replace(nav.path)}/>
        ))}
      </TabBar>
    );
  }
}
//components组件没有location，要用withRouter进行包装之后才有
export default withRouter(NavFooter)