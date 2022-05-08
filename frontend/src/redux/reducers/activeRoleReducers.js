import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeRoleReducers(state=initialState.roleData,action){
    switch (action.type) {
        case actionTypes.ACTIVEROLE:
        return state =action.payload
        default:
            return state;
            
    }
}
