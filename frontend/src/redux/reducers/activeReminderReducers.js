import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState"


export default function activeReminderReducers(state=initialState.reminderData,action){
    switch (action.type) {
        case actionTypes.ACTIVEREMİNDER:
        return state =action.paylaod
        default:
            return state;
            
    }
}
