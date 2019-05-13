import React, { Component } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import "./Account.css"
import {connect} from 'react-redux'
import {checkUser, changepic} from '../../ducks/itemReducer'


 class Account extends Component {
  constructor(){
    super()
    this.state ={
        file:"",
        post:[],
        profilePic:[]
        
    }
}


  componentDidMount(){
    
    this.props.checkUser()
    axios.get("/api/getpost").then(resault =>{
      this.setState({
        post:resault.data
      })
    })
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
      this.props.changepic(response.data.Location)
      
      // window.location.reload()
    }).catch(error => {
      // handle your error
    });
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }


handleDelete = (id) =>{
  axios.delete(`/api/delete/${id}`)
  window.location.reload()

}

  render() {
    
    const displayPost = this.state.post.map(post =>{
     
       return <div className="post-card" >
         <p>${post.price}</p>
         <img className="post-pic" src={post.picture} alt="pic"></img>
         <Link to={`/edit/${post.item_id}`}>
         <button className="sell-btn">Change Price</button>
         </Link>
         <Link to="/account">
         <button onClick={() =>{this.handleDelete(post.item_id)}} className="sell-btn">delete</button>
         </Link>
       </div>
    })
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
        
       <br></br>
        
        </div>
        <div className="main-acc">
         <h1>My Post</h1>
         <div className="my-post">
            {displayPost}
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

export default connect(mapStateToProps,{checkUser,changepic}) (Account)