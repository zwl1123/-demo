import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from "../../redux/actions";


 class Laoban extends Component{
   componentDidMount(){
     this.props.getUserList('dashen')
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
)(Laoban)
