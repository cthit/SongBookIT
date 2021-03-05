import { postRequest } from "../utils/api";
import { GAMMA_SIGNOUT_ENDPOINT } from "../utils/endpoints";

export function signoutFromSongbook(song) {
    return postRequest(GAMMA_SIGNOUT_ENDPOINT
    );
}
