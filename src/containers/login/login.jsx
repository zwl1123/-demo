import React,{Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login,reset_user} from '../../redux/actions'
import Logo from "../../components/logo/logo";


class Login extends Component{
  state = {
    username:'',
    password:'',
  }
  toRegister = () =>{
    this.props.reset_user()
    this.props.history.push('/register')

  }

  handleChange = (name,val)=>{
    this.setState({
      [name]:val
    })
  }

  login = () =>{
    this.props.login(this.state)
  }


  render(){
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
            <Button type="primary" style={{background:'#1cae82'}} onClick={this.login} >登陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {login,reset_user}
)(Login)