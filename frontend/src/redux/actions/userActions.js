import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getUserSuccess(res){
  return {type:actionTypes.GETUSERSUCCESS,
    paylaod:res
}}

export function getUsers() {
  return function(dispatch){
   axios.get("/api/users/").then((res) => dispatch(getUserSuccess(res.data)));
  }}


  export function getActiveUser(user) {
    return {type:actionTypes.ACTIVEUSER,
      paylaod:user
  }}
  
  export function deleteUser(userid) {
    return function(dispatch){
      axios
      .delete(`/api/users/${userid}/`)
      .then((res) => dispatch(getUsers()));
      
    }}
    export function editUser(user) {
      return function(dispatch){
        axios
        .put(`/api/users/${user.id}/`, qs.stringify(user))
        .then((res) => dispatch(getUsers()));        
      }}

      export function addUser(user) {
        return async dispatch=>{
          const {data}=  axios
          .post("/api/users/", user,{
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
          .then((res) => dispatch(getUsers())).catch((err) => console.log(err));;      
        }}
       
