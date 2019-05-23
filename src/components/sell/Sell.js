import React, { Component } from 'react'
import "./Sell.css"
import axios from "axios"
import {addItem,checkUser} from "../../ducks/itemReducer"
import { connect } from 'react-redux';
import {Link} from "react-router-dom"




 class Sell extends Component {
    constructor(props){
      super(props)
      this.state ={
        name:"",
        price:"",
        description:"",
        picture:"",
        location:""
        


      }
    }

    componentDidMount(){
      this.props.checkUser();
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
        
        this.setState({picture:response.data.Location})
        // handle your response;
        
      }).catch(error => {
        
        // handle your error
      });
    }
  
    handleFileUpload = (event) => {
      this.setState({file: event.target.files});
    }

    
    
    handleInput = (e) =>{
      
      this.setState({[e.target.name]:e.target.value})
      
      
    }

    handleSubmit = (e) =>{
      // e.preventDefault()
      
      const {name, picture,price,description,location} = this.state
     
     this.props.addItem(name, picture,price,description,location)

    }


   


  
  render() {
    
    return (
      <>
    <div className="sell-compenent">
       <div className="both-from">
     
     <div className="sell-pic">
     {/* <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/10best-cars-group-cropped-1542126037.jpg"/> */}
     <img src={this.state.picture} alt=""></img>
     </div>
     
      
    
      <form className="sell-info-card" >
        <h1>Sell</h1>
        <form className="pic-card" onSubmit={this.submitFile} >
        <label className="myLabel">
        <input className="file-icom" label='upload file' type='file' onChange={this.handleFileUpload} />
        <span>Select Picture</span>
        </label>
        <button className="upload-btn sell-btn" type='submit'>upload</button>
        </form>
        <span>Item Name </span>
        <input name="name" onChange={this.handleInput}></input>
        <span>Price </span>
        <input name="price" onChange={this.handleInput} ></input>
        <span>description </span>
        
        <textarea type="text" className="description-input" name="description" onChange={this.handleInput}></textarea>
        
        <span>City</span>
        <input name="location" onChange={this.handleInput}></input>
        <Link className="link" to="/">
          <button className="sell-btn" type="submit" onClick={this.handleSubmit}>Submit</button>
        </Link>
        

      </form>
      </div>
    </div>
    </>
    )
  }
}


const mapStateToProps = state => {
  return{
    email: state.email,
    
  }
}
  


export default connect(mapStateToProps,{addItem,checkUser})(Sell)