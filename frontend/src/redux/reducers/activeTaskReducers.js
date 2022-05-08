import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeTaskReducers(state=initialState.taskData,action){
    switch (action.type) {
        case actionTypes.ACTIVETASK:
        return state =action.paylaod
        default:
            return state;
            
    }
}
