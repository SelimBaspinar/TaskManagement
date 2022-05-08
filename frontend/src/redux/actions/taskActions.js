import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getTaskSuccess(res){
  return {type:actionTypes.GETTASKSUCCESS,
    paylaod:res
}}

export function getTask() {
  return function(dispatch){
   axios.get("/api/tasks/").then((res) => dispatch(getTaskSuccess(res.data)));
  }}


  export function getActiveTask(item) {
    return {type:actionTypes.ACTIVETASK,
      paylaod:item
  }}
  
  export function deleteTask(item) {
    return function(dispatch){
      axios
      .delete(`/api/tasks/${item}/`)
      .then((res) => dispatch(getTask()));
      
    }}
    export function editTask(item) {
      return function(dispatch){
        axios
        .put(`/api/tasks/${item.id}/`, qs.stringify(item)).then((res) => dispatch(getTask()));
      }}
      export function editTaskOrder(item,id) {
        return function(dispatch){
          axios
          .put(`/api/tasks/${id}/`, qs.stringify(item)).then((res) => dispatch(getTask()));
        }}

      export function addTask(item) {
        return async dispatch=>{
        const {data}=await axios.post("/api/tasks/", qs.stringify(item)).catch((err)=>console.log(err))
        dispatch(getTask())
        }}
       
