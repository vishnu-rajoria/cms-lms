import axios from "axios";
import { baseURL } from "@/Env";

export async function getCourses() {
    return axios
        .get(baseURL + "/api/get-courses")
        .then(function (response) {
            // Log the response from the server
         
            return response;
        })
        .catch(function (error) {
            // Log the error from the server
            console.log("Error from server");
            console.log(error.response.data);
        });
}
