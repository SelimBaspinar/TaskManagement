import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function loginReducers(state=initialState.loginStatus,action){
    switch (action.type) {
        case actionTypes.LOGINSTATUS:
        return state =action.payload
        default:
            return state;
            
    }
}
