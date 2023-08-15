import axios from "axios";
import apiTemplate from "../assets/apiTemplate.json";

const apiUrl = "http://192.168.114.102:1349/api/";

export const apiFetch = async (endpoint, dev = false) => {
  let res;
  if (dev) {
    res = apiTemplate[endpoint];
  } else {
    res = await axios.get(apiUrl + endpoint);
  }
  return dev ? res : res.data;
}