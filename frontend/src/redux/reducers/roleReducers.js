import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function roleReducers(state=initialState.roleData,action){
    switch (action.type) {
        case actionTypes.GETROLESUCCESS:
        return state =action.payload
        default:
            return state;
            
    }
}
