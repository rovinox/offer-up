import React, { Component } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import "./Message.css"

export default class Message extends Component {
  constructor(){
    super()
    this.state = {
      name:"",
      message:"",
      email:"",

    }
  }

  handleInput = (e) =>{
      
    this.setState({[e.target.name]:e.target.value})
    
    
    
  }

  handleSubmit = (e) =>{
    e.preventDefault() 
    const {name,message,email} = this.state
    axios.post(`/api/email`,{name,message,email}).then(response=>{
      if(response.status===200){

        toast("Message Sent", { type: "success" });
      }
    })

  }


  render() {
    return (
      <div className="message-component">
        <form className="Message-form" onSubmit={this.handleSubmit}>
        <h1>Contact</h1>
            <span>Name</span>
            <input name="name" onChange={this.handleInput}></input>
            
            <span>Message</span>
            
            <textarea  name="message" className="message-input" onChange={this.handleInput}></textarea>
            
            <span>Your Email</span>
            <input name="email" onChange={this.handleInput}></input>
            <br></br>
            
            <button  type="submit" className="sell-btn send" >Send</button>
            
        </form>
      </div>
    )
  }
}
