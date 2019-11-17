import React,{Component} from 'react'
import {connect} from "react-redux";
import UserList from "../../components/user-list/user-list";
import {getUserList} from '../../redux/actions'

class Dashen extends Component{
  componentDidMount(){
    this.props.getUserList('laoban')
  }
  render() {

    return (
      <UserList userlist ={this.props.userlist}/>
    );
  }
}

export default connect(
  state => ({userlist:state.userlist}),
  {getUserList}
)(Dashen)