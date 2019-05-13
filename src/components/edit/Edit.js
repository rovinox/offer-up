import React, { Component } from 'react'
import axios from "axios"
import {connect} from 'react-redux'
import {checkUser} from '../../ducks/itemReducer'
import  "./Edit.css"

class Edit extends Component {
    constructor(){
        super()
        this.state ={
            file:"",
            post:[],
            price:"",
            item:[]
        }
    }
    
    
      componentDidMount(){
        this.props.checkUser()
        axios.get(`/api/getitem/${this.props.match.params.item_id}`).then(data =>{
          
      
          this.setState({
          item:data.data
    })
  })
      }
     
      handleSubmit = () =>{
        axios.post(`/api/changeprice/${this.props.match.params.item_id}/${this.state.price}`)
        
      }

      
      submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file[0]);
        axios.post(`/test-upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
         
        }).catch(error => {
          // handle your error
        });
      }


      handlePrice = (e) =>{
        this.setState({
          price : e.target.value
        })
      }
    
      handleFileUpload = (event) => {
        this.setState({file: event.target.files});
      }
      render() {
        
        return (
          <div className="acc-component">
            
           
            <div className="profile-pic-side">
            <img className="profile-pic" src={this.props.image} alt="pic"/>
            <h1>{this.props.name}</h1>
            <form className="profile-pic-uplodaer" onSubmit={this.submitFile}>
            <label class="myLabel">
        <input className="file-icom" label='upload file' type='file' onChange={this.handleFileUpload} />
        <span>Select Picture</span>
        </label>
            <button className="sell-btn" type='submit'>upload</button>
          </form>
            
           </div>
           <div className="main-edit">
             <h1>Edit Info</h1>
            <div className="edit-card">
            { this.state.item[0] ? <img className="edit-card-pic" src={this.state.item[0].picture} alt="pic"/>:<h1 className="animated infinite flash" >loading...</h1>}
              

              <form className="edit-form" onSubmit={this.handleSubmit}>
              { this.state.item[0] ? <p>{this.state.item[0].name}</p>:<h1 className="animated infinite flash" >loading...</h1>}
              { this.state.item[0] ? <p>Current price: ${this.state.item[0].price}</p>:<h1 className="animated infinite flash" >loading...</h1>}   
                <p>New Price</p>
                <input className="change-input" onChange={this.handlePrice}></input>
                <br></br>
                <br></br>
                <button className="sell-btn">Update</button>
              </form >

            </div>

           </div>
            
          </div>
    
    
        )
      }
}

const mapStateToProps = state => {
    return{
      name: state.name,
      image: state.image
    }
  }
  
  export default connect(mapStateToProps,{checkUser}) (Edit)