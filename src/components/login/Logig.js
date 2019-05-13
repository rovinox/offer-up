import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "./Login.css"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {login} from "../../ducks/itemReducer"
import { toast } from "react-toastify";



class Login extends Component {

  constructor(){
    super()
    this.state={
      
      email:"",
      password:"",
      

    }
  }

  handleLogin = () =>{
    const {email,password} = this.state
    this.props.login(email,password)
    if(this.props.error){
      
      toast(this.props.error,{ type: "error" });

    }
  }

  handleInput = (e) =>{
    this.setState({[e.target.name]:e.target.value})
    
  }

  render() {
    if(this.props.redirect){
      return <Redirect to="/" />
    }
    return (
      <div className="login-component">
      
      <div className="login-info">
      <h1>Login</h1>
      
      <p>Email</p>
      <input type="email" name="email" onChange={this.handleInput}></input>
      <p>Password</p>
      <input name="password" type="password" onChange={this.handleInput}></input>
      <br></br>
      <button className="sell-btn" onClick={this.handleLogin}>Submit</button>
      <br></br>
      <span>Don't have An Account? </span>
      <Link to="/signup">Signup</Link>
     
      </div>
       
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{login})(Login)
