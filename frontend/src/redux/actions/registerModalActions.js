import * as actionTypes from "./actionTypes"
import axios from "axios";
import qs from "qs";

export function getRegisterModal(res){
  return {type:actionTypes.GETREGISTERMODAL,
    payload:res
}}


