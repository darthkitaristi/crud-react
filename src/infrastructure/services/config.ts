import axios from "axios";

const BASE_URL = "https://pokemon-pichincha.herokuapp.com/";

const API = axios.create({
    baseURL: BASE_URL
})

export default API;