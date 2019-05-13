import {createStore, applyMiddleware} from "redux"
import promiseMiddleware from "redux-promise-middleware"
import itemReduser from "./ducks/itemReducer"











export default createStore(itemReduser,applyMiddleware(promiseMiddleware))