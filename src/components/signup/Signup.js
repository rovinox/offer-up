import React, { Component } from 'react'
import {Link,Redirect} from "react-router-dom"
import {connect} from "react-redux"
import {signup} from "../../ducks/itemReducer"
import { toast } from "react-toastify";

import "./Signup.css"


class Signup extends Component {

  constructor(){
    super()
    this.state={
      name:"",
      email:"",
      password:"",

    }
  }


  handleInput = (e) =>{
    this.setState({[e.target.name]:e.target.value})
  }


  handleSubmit = ( ) =>{
    const {name, email, password} =this.state
    this.props.signup(name, email, password)
    if(this.props.error){
      
      toast(this.props.error,{ type: "error" });

    }


  }

  render() {
    if(this.props.redirect){
      return <Redirect to="/" />
    }
    return (
      <div className="signup-compenent">
      
      <div className="signup-info">
      <h1>Signup</h1>
      <p>Name</p>
      <input  placeholder="Fulname" name="name" type="text" onChange={this.handleInput}></input>
      <p>Email</p>
      <input placeholder="Email" type="email" name="email" onChange={this.handleInput}></input>
      <p>Password</p>
      <input placeholder="Password" name="password" type="password" onChange={this.handleInput}></input>

      <br></br>
      <button className="sell-btn" onClick={this.handleSubmit}>Submit</button>

      <br></br>
      <span>Got An Account Already? </span>
      <Link to="/login">Login</Link>
      
      </div>
       
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{signup})(Signup)