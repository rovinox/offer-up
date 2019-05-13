import {Switch, Route} from "react-router-dom"
import React from "react"
import Home from "./components/home/Home"
import Login from "./components/login/Logig"
import Sell from "./components/sell/Sell"
import Signup from "./components/signup/Signup"
import item from "./components/item/Item" 
import Account from "./components/account/Account";
import Search from "./components/search/Search";
import Edit from "./components/edit/Edit";
import Message from "./components/message/Message";



export default (    
    <Switch>
        
        <Route path="/edit/:item_id" component={Edit}/> 
        <Route path="/search/:item" component={Search}/> 
        <Route path="/account" component={Account}/> 
        <Route path="/message" component={Message}/>
        <Route path="/item/:id" component={item}/>
        <Route path="/sell" component={Sell}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/" component={Home}/>

        


    </Switch>
)