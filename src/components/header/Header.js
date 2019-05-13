import React, { Component } from 'react'
import "./Header.css"
import logo from "./logo.png"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logout } from "../../ducks/itemReducer"


class Header extends Component {
    constructor(){
        super()
            this.state={
                menu:"close",
                search:"",
                
                
            }
        
    }

    // componentDidMount() {
    //     window.addEventListener("keypress", this.handleEnter);
    // }


    handleSearch = (e) =>{
        this.setState({
            search: e.target.value
            
        })
        
       
        
    }


    
    handleNav =() =>{
        if(this.state.menu==="open"){
            this.setState({
                menu:"close"
            })
        }else{
            this.setState({
                menu:"open"
            })
            
        }
    }    



  render() {
    
     
     
    return (
      
          <header className="nav">
              <div className="logo">
              <Link to="/">
              <img  className="animated  rollIn"src={logo} alt="logo"></img>
              </Link>  
              </div>
            <i className="fas fa-bars" onClick={this.handleNav}></i>
            
            <form className="search-form">
            {/* <input type="text" placeholder="  Search..." className="search" onChange={this.handleSearch}></input> */}
            <input type="text" placeholder="&#61442;" className="mainLoginInput" onChange={this.handleSearch}></input>
            <Link to={`/search/${this.state.search}`}>
            <button className="search-btn" type="submit">Search</button>
            </Link>
            
            </form> 

           
            <ul className="nav-items">

                {!this.props.loggedIn ? null : <Link to="/sell">
                <li className="sell">Sell</li>
                </Link>}


 
                  {!this.props.loggedIn ? <Link to="/signup">
                 <li className=" signup">SignUp</li>
                 </Link>: <Link to="/account"><li className="signup">Account</li></Link>}

                {!this.props.loggedIn ? <Link to="/login">
                 <li className="login">Login</li></Link> : <Link to="/">
                 <li className="login" onClick={this.props.logout}>LogOut</li></Link>} 
                 {/* {!this.props.loggedIn ? null : <Link to="/cart"><li><i class="fas fa-shopping-cart"></i></li></Link>} */}
                 
            </ul>
               <div className={"menu-"+this.state.menu}>
               
               <ul className="burger-items">
               {!this.props.loggedIn ? null :<Link to="/sell">
                <li>Sell</li>
                </Link>}
               {!this.props.loggedIn ? <Link to="/signup">
                <li>SignUp</li>
                </Link> : <Link to="/account"><li>Account</li></Link>}

               {!this.props.loggedIn ? <Link to="/login">
                <li>Login</li>
                </Link> : <Link to="/"><li onClick={this.props.logout}> LogOut</li></Link> }
            </ul>
               </div> 
              
          </header>
        
      
    )
  }
}
const mapStateToProps = state => state

     
 

export default connect(mapStateToProps,{logout})(Header)

