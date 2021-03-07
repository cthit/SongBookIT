import { postRequest } from "../utils/api";
import { GAMMA_SIGNOUT_ENDPOINT } from "../utils/endpoints";

export function signoutFromSongbook() {
    postRequest(GAMMA_SIGNOUT_ENDPOINT);
    window.location.reload();
}
