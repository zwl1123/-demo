import React,{Component} from 'react'
import {connect} from "react-redux";
import {List, Result,WhiteSpace,Button,Modal} from "antd-mobile"
import Cookies from 'js-cookie'
import {reset_user} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
 class Personal extends Component{
   logout = () =>{
     Modal.alert('退出','确定退出登录吗？',[
       {text:'取消'},
       {text: '确定',
       onPress:() =>{
         //干掉cookie里面的userid
         Cookies.remove('userid')
         //还有干掉redux里面的user
          this.props.reset_user()
       }
       }
     ])
   }

  render() {
    const {username,header,company,post,info,salary,type} = this.props.user
    return (
      <div  style={{marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images1/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {post}</Brief>
            <Brief>简介: {info}</Brief>
            {type === 'laoban'?<Brief>薪资: {salary}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    );
  }
}

export default connect(
  state => ({user:state.user}),
  {reset_user}
)(Personal)