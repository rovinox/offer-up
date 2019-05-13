import axios from "axios"






const initialState ={
    items:[],
    redirect:false,
    email: "",
    password: "", 
    name:"",
    image:"",
    loggedIn: false,
    error:""
    
}
const LOGOUT = 'LOGOUT'
const CHECK_USER = "CHECK_USER"
const  SIGNUP = "SIGNUP"
const LOGIN = "LOGIN"
const ADD_ITEM = "ADD_ITEM"
const CHANGE_PICTURE = "CHANGE_PICTURE"
const GET_ITEMS= "GET_ITEMS"


export const logout = () => {
    let data = axios.get('/api/logout')
    return{
        type: LOGOUT,
        payload: data
    }
}

export const checkUser =()=>{
    let data = axios.get("/api/checkuser").then(response => response.data)
        return{
            type:CHECK_USER,
            payload:data
        }
}

export const getItems =()=>{
    let data = axios.get("/api/getitems").then(response => response.data)
        return{
            type:GET_ITEMS,
            payload:data
        }
}

export const login = (email, password) =>{
    let data = axios.post("/api/login",{email,password}).then(response => response.data)
        return{
            type:LOGIN,
            payload:data
        }
    

}

export const signup =(name, email, password) =>{
    let data = axios.post("/api/signup",{name, email, password}).then(response =>response.data)
    
    return {
        type:SIGNUP,
        payload:data
    }
}

export const changepic = (image) =>{
    
    let data = axios.put(`/api/profilePic`,{image}).then(response =>response.data)
         return {
            type:CHANGE_PICTURE,
            payload:data
        }
        

        

    }


export const  addItem = (name, picture,price,description,location)=>{
    let data = axios.post("/api/sell",{name, picture,price,description,location})
  
    return{

        type: ADD_ITEM,
        payload: data
      
    }

}

                                
export default function itemReducer (state=initialState, action){
    console.log(action);
    switch (action.type) {
        case `${ADD_ITEM}_FULFILLED`:
            return {...state, items:[...action.payload.data],redirect:true}

        case `${GET_ITEMS}_FULFILLED`:
        
            return {...state, items:action.payload}

        case `${LOGIN}_FULFILLED`:
            return {...state, email:action.payload.email, redirect:true,loggedIn: true} 

        case `${LOGIN}_REJECTED`:
            return {...state, error:action.payload.response.data} 


        case `${SIGNUP}_FULFILLED`:
            return {...state, name: action.payload.name, redirect:true}

        case `${SIGNUP}_REJECTED`:
            return {...state, error:action.payload.response.data} 


        case `${CHECK_USER}_FULFILLED`:
                   let loggedIn = true
               if(action.payload.email=== ""|| !action.payload){
                   loggedIn= false

               }
        return {...state, email:action.payload.email, name: action.payload.name,image: action.payload.image, loggedIn:loggedIn}
            case `${LOGOUT}_FULFILLED`:
            return{
                ...state,email:'', password:'',redirect: false, loggedIn: false,
                    
            }
        case `${CHANGE_PICTURE}_FULFILLED`:
        
            return {...state, image: action.payload[0].image}
           
    default:     
        return state      
    }
    
}



