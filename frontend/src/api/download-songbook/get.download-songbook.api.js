import { getRequest } from "../utils/api";
import { DOWNLOAD_SONGBOOK_ENDPOINT } from "../utils/endpoints";
import { saveDownloadedFile } from "../utils/save-downloaded-file";

export function downloadSongbook() {
    return getRequest(DOWNLOAD_SONGBOOK_ENDPOINT + Date.now()).then(
        saveDownloadedFile
    );
}
