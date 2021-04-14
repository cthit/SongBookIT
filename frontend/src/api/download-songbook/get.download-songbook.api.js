import { getRequest } from "../utils/api";
import { DOWNLOAD_SONGBOOK_ENDPOINT } from "../utils/endpoints";
import { saveDownloadedFile } from "../utils/save-downloaded-file";

function downloadSongbook(type, fileName, fileType) {
    return getRequest(
        DOWNLOAD_SONGBOOK_ENDPOINT + type + "/" + Date.now()
    ).then(res => saveDownloadedFile(res, fileName, fileType));
}

export const downloadSongbookMD = () =>
    downloadSongbook("md", "songbook.md", "text/markdown, encoding=utf8;");
