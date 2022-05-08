import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function loginModalReducers(state=initialState.loginModal,action){
    switch (action.type) {
        case actionTypes.GETLOGINMODAL:
        return state =action.payload
        default:
            return state;
            
    }
}
