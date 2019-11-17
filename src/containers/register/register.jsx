import React,{Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'

import Logo from "../../components/logo/logo";
const ListItem = List.Item

 class Register extends Component{
  state = {
    username:'',
    password:'',
    password2:'',
    type:'laoban'
  }
  toLogin = () =>{
    this.props.history.push('/login')
  }

  handleChange = (name,val)=>{
    this.setState({
      [name]:val
    })
  }

  register = () =>{
    //console.log(this.state)

    this.props.register(this.state)
  }


  render(){
    const {type} = this.state
    const {msg,redirectTo} = this.props.user
    if(redirectTo){
      return <Redirect to={redirectTo}></Redirect>
    }
    return(
      <div>
        <NavBar style={{ background: '#1cae82' }}>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg?<div className='error-msg'>{msg}</div>:null}
            <WhiteSpace/>
            <InputItem type="text" placeholder="请输入用户名" onChange={val=> this.handleChange('username',val)}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入密码" onChange={val=> this.handleChange('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入确认密码" onChange={val=> this.handleChange('password2',val)}>确认密码：</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>用户类型：</span>
              <Radio checked={type === 'dashen'} onChange={val=> this.handleChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={val=> this.handleChange('type','laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type="primary" style={{background:'#1cae82'}} onClick={this.register} >注册</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {register}
)(Register)