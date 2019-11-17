import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {updateUser} from '../../redux/actions'
import {InputItem,NavBar,Button,TextareaItem} from 'antd-mobile'

import Header from '../../components/Header/Header'
 class LaobanInfo extends Component{
  state = {
    header: '', //头 像 名 称
    info: '', //职 位 简 介
    post: '', //职 位 名 称
    company: '', // 公 司 名 称
    salary: '' //薪资
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
        <NavBar style={{ background: '#1cae82' }}>老板信息完善</NavBar>
        <Header setHeader={this.setHeader}/>
        <InputItem placeholder='请输入招聘职位' onChange={val=>this.handleChange('post',val)}>招聘职位</InputItem>
        <InputItem placeholder='请输入公司名称' onChange={val=>this.handleChange('company',val)}>公司名称</InputItem>
        <InputItem placeholder='请输入职位薪资' onChange={val=>this.handleChange('salary',val)}>职位薪资</InputItem>
        <TextareaItem placeholder='请输入个人介绍' title='职位要求' rows={3}
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
)(LaobanInfo)

