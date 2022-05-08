import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function notificationModalReducers(state=initialState.loginModal,action){
    switch (action.type) {
        case actionTypes.GETNOTIFICATIONMODAL:
        return state =action.payload
        default:
            return state;
            
    }
}
