import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function taskReducers(state=initialState.taskData,action){
    switch (action.type) {
        case actionTypes.GETTASKSUCCESS:
        return state =[...action.paylaod]
        default:
            return state;
            
    }
}
