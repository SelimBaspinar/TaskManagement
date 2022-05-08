import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeUserReducers(state=initialState.userData,action){
    switch (action.type) {
        case actionTypes.ACTIVEUSER:
        return state =action.paylaod
        default:
            return state;
            
    }
}
