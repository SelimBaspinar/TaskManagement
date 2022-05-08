import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function userReducers(state=initialState.userData,action){
    switch (action.type) {
        case actionTypes.GETUSERSUCCESS:
        return state =action.paylaod
        default:
            return state;
            
    }
}
