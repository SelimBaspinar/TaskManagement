import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getReminderSuccess(res){
  return {type:actionTypes.GETREMİNDERSUCCESS,
    paylaod:res
}}

export function getReminder() {
  return function(dispatch){
   axios.get("/api/reminders/").then((res) => dispatch(getReminderSuccess(res.data)));
  }}


  export function getActiveReminder(item) {
    return {type:actionTypes.ACTIVEREMİNDER,
      paylaod:item
  }}
  
  export function deleteReminder(item) {
    return function(dispatch){
      axios
      .delete(`/api/reminders/${item}/`)
      .then((res) => dispatch(getReminder()));
      
    }}
    export function editReminder(item) {
      return function(dispatch){
        axios
        .put(`/api/reminders/${item.id}/`, qs.stringify(item))
        ;        
      }}

      export function addReminder(item) {
        return async dispatch=>{
        const {data}=await axios.post("/api/reminders/", qs.stringify(item)).catch((err)=>console.log(err))
        dispatch(getReminder)
        }}
       
