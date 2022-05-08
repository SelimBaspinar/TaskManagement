import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getRoleSuccess(res){
  return {type:actionTypes.GETROLESUCCESS,
    payload:res
}}

export function getRoles() {
  return function(dispatch){
     axios.get("/api/roles/").then((res) => dispatch(getRoleSuccess(res.data)));

  }}


  export function getActiveRole(role) {
    return {type:actionTypes.ACTIVEROLE,
      paylaod:role
  }}
  
  export function deleteRole(roleid) {
    return function(dispatch){
      axios
      .delete(`/api/roles/${roleid}/`)
      .then((res) => dispatch(getRoles()));
      
    }}
    export function editRole(role) {
      return function(dispatch){
        axios
        .put(`/api/roles/${role.id}/`, qs.stringify(role))
        .then((res) => dispatch(getRoles()));        
      }}

      export function addRole(role) {
        return function(dispatch){
          axios
          .post("/api/roles/", qs.stringify(role)).catch((err)=>console.log(err))
  
        }}
