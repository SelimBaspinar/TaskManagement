import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function registerModalReducers(state=initialState.loginModal,action){
    switch (action.type) {
        case actionTypes.GETREGISTERMODAL:
        return state =action.payload
        default:
            return state;
            
    }
}
