import React, { Component } from 'react'
import "./Search.css"
import {Link} from 'react-router-dom'
import axios from 'axios';
 

export default class Search extends Component {
    constructor(){
        super()
        this.state ={
            foundItem:[],
            
        }
    }



    componentDidMount(){

        axios.get(`/api/search/${this.props.match.params.item}`).then(result =>{
            this.setState({
                foundItem:result.data
            })
           

        })


        
        
    }


  render() {
    const displaySearch = this.state.foundItem.map((item ) =>{
        return <Link to={`/item/${item.item_id}`}>
          <div className="searched-item" key={item.item_id}>
                <p>{item.name}</p>
                <img className="searched-pic" src={item.picture} alt="pic"/>
                <p>${item.price}</p>
                
          </div>

        </Link>
    })
    return (
      <div className="sc-component">
       {displaySearch}
      </div>
    )
  }
}
