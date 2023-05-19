import {combineReducers} from "redux";
import { cartreducer } from "./reducercart";
import { favreducer } from "./reducerfav";


const rootred = combineReducers({
    cartreducer,favreducer

});


export default rootred