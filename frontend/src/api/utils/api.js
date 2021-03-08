import axios from "axios";
import _ from "lodash";

export function getRequest(endpoint) {
    return axios.get(removeLastSlash(endpoint));
}

export function postRequest(endpoint, data) {
    return axios.post(removeLastSlash(endpoint), data);
}

export function deleteRequest(endpoint) {
    return axios.delete(removeLastSlash(endpoint));
}

export function putRequest(endpoint, data) {
    return axios.put(removeLastSlash(endpoint), data);
}

function removeLastSlash(path) {
    return _.trimEnd(path, "/");
}
