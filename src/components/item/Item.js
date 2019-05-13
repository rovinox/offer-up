import React, { Component } from 'react'
import axios from "axios"
import "./Item.css"
import {getItems} from "../../ducks/itemReducer"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import "react-toastify/dist/ReactToastify.css";
toast.configure();



 class Item extends Component {
   constructor(){
     super()
     this.state ={
       item:[],
      seller:[],
       products:[]
       
     }
   }




   componentDidMount(){
    
      axios.get(`/api/getitem/${this.props.match.params.id}`).then(data =>{
      
            this.setState({
            item:data.data
      })
    })

      axios.get(`/api/getseller/${this.props.match.params.id}`).then(data =>{
      console.log('data: ', data);
      
      this.setState({
      seller:data.data
      })
    })

      axios
      .get("https://practiceapi.devmountain.com/products/")
      .then(response => {
        this.setState({
          products: response.data
          
        });
        
      });


   }




    handleToken = async (token, addresses) => {
    // const {item} = this.state
    const response = await axios.post(

      "/api/checkout",
      { token, item:this.state.item[0]}
    );
    const { status } = response.data;
    
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }


    


   


  
  render() {
    const displaytoprated = this.state.products.map(item =>{
       return <div key={item.id}>
       <a href="https://www.shopdevmountain.com/shop" target="_blank" >
       <img className="toprated-pic" src={item.image} alt="pic"/>
       </a>
       <p className="price">${item.price}</p>

       </div>
    })

    
    
   
    
    return (
      <div className="item-component">
        <div className="sell-item-info" >
            {this.state.seller[0] ? <div className="seller-info">
              <img className="seller-pic" src={this.state.seller[0].image} alt="pic"/>
              <h3>{this.state.seller[0].name}</h3>
            </div>:<h1 className="animated infinite flash" >loading...</h1>}
          <div className= "pictire-card-and-side">
            <div className="pic-side" >
               { this.state.item[0] ? <img className="sell-pic" src={this.state.item[0].picture} alt="pic"/>:<h1 className="animated infinite flash" >loading...</h1>}
                
            </div>
            { this.state.item[0] ? <div className="info-side">
              <p >{this.state.item[0].description}</p>
              <p className="item-name">{this.state.item[0].name}</p>
                <p className="price">$ {this.state.item[0].price}</p>
                <p> City: {this.state.item[0].location}</p>
                <div className="two-btn">
                <Link to="/message">
              <button className="sell-btn">Message</button>
                </Link>
                <StripeCheckout
                stripeKey="pk_test_8FyxzDB3cgaXaPLiGDXwzDXI00ZCg01wU8"
                token={this.handleToken}
                billingAddress
                shippingAddress
                amount={this.state.item[0].price*100}
                name={this.state.item[0].name}
                />
              {/* <Link to="/buy">

              <button className="sell-btn">Buy</button>
              </Link> */}
               </div> 
                
              </div>
               :<h1 className="animated infinite flash" >loading...</h1>}


             
             
     
            </div>
          <div className="top-rated">
            <i class=" icon fas fa-ad animated infinite flash"></i>
            {displaytoprated}

          </div> 

        </div>
        
      </div>
    )
  }
}



const mapStateToProps = state => state
export default connect(mapStateToProps,{getItems})(Item)

