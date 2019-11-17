import React,{Component} from 'react'
import {InputItem,NavBar,Button,TextareaItem} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import Header from '../../components/Header/Header'
import connect from "react-redux/es/connect/connect";
import {updateUser} from "../../redux/actions";
 class DashenInfo extends Component{
  state = {
    header: '', //头 像 名 称
    info: '', //职 位 简 介
    post: '', //职 位 名 称
  }

  setHeader = (header) =>{
    this.setState({header})
  }

   save = () =>{
    this.props.updateUser(this.state)
  }

  handleChange = (name,val) =>{
    this.setState({
      [name]:val
    })
  }


  render(){
    const {type,header} = this.props.user
    if(header){
      let path = ''
      path = type === 'dashen'? '/dashan':'/laoban'
      return <Redirect to={path}/>
    }

    return(
      <div>
        <NavBar style={{ background: '#1cae82' }}>大神信息完善</NavBar>
        <Header setHeader={this.setHeader}/>
        <InputItem placeholder='请输入招聘职位' onChange={val=>this.handleChange('post',val)}>求职岗位</InputItem>
        <TextareaItem placeholder='请输入个人介绍' title='个人介绍' rows={3}
                      onChange={val=>this.handleChange('info',val)}/>

        <Button type="primary" style={{background:'#1cae82'}}
                activeStyle={{background:'#1DA57A'}} onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
  {updateUser}
)(DashenInfo)
