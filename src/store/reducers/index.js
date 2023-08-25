import { combineReducers } from "redux";
import ActionMovie from './reducerActionMovies.js'
import ComedyMovie from './reducerComedyMovies.js';

// 장르들을 추가 
const rootReducer = combineReducers({
    action : ActionMovie,
    comedy : ComedyMovie,

})

export default rootReducer;