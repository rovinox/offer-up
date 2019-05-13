import React, { Component } from 'react'
import {connect} from "react-redux"
import {getItems, checkUser} from "../../ducks/itemReducer"
import {Link} from "react-router-dom"
import "./Home.css"
 class Home extends Component {
   
    componentDidMount(){
      this.props.getItems()
      this.props.checkUser();

    }
  render() {
    
    return (
      
      <div className="home">
       {!this.props.items[0] ? <h2 className="animated infinite flash">Loading...</h2> : this.props.items.map((item ,index) =>{
       return <Link  key={index} 
       
        to={`/item/${item.item_id}`}>
       <div className="card" key={index}>
        <img className="main-pic" src={item.picture} alt="pic"/>
         <p>{item.name}</p>
         <p>${item.price}</p> 
         <br/>
         <p>City:{item.location}</p> 
         {/* <p>{item.item_id}</p> */}
         

       </div>
       </Link>

    })}


        

      </div>
      
    )
  }
}









function mapStateToProps(state) {
 
  return{
    
    items:state.items

  }
}
  
  export default connect(mapStateToProps,{getItems,checkUser})(Home)