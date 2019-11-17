import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {List,Grid} from 'antd-mobile'


export default class Header extends Component{
  static propTypes = {
    setHeader:PropTypes.func.isRequired
  }

  state={
    icon:null
  }

  constructor (props) {
    super(props)
    this.headerList = []
    //headList=[{text:图片的名字；icon：图片对象的相对路径},{},{}]
    for (let i = 0; i < 20; i++) {
      this.headerList.push(
        {text:`${i+1}`,
         icon:require(`../../assets/images1/${i+1}.png`)
        })

    }
  }

  //表格里每一个都是一个el对象，需要对它进行解构
  selectHeader = ({icon,text}) =>{
    //更新当前组件的icon还有更新父组件的header
    this.setState({icon})
    this.props.setHeader(text)
  }

  render() {
    const {icon} = this.state
    const gridHeader = icon?<div>已选择头像<img src={icon} alt=''/></div> : '请选择头像'
    return (
      <List renderHeader={() => gridHeader}>
        <Grid data={this.headerList} columnNum={5} onClick={this.selectHeader}>
        </Grid>
      </List>
    );
  }
}