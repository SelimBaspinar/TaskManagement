import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function reminderReducers(state=initialState.reminderData,action){
    switch (action.type) {
        case actionTypes.GETREMİNDERSUCCESS:
        return state =action.paylaod
        default:
            return state;
            
    }
}
