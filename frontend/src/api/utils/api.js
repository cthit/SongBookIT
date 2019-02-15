import axios from "axios";
import _ from "lodash";

const path = "http://localhost:5000/";

export function getRequest(endpoint) {
    return axios.get(removeLastSlash(path + endpoint));
}

function removeLastSlash(path) {
    return _.trimEnd(path, "/");
}
