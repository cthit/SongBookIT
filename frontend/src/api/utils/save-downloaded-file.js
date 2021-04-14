export const saveDownloadedFile = (res, fileName, fileType) => {
    // Create blob link to download
    const URL = window.URL || window.webkitURL;
    const url = URL.createObjectURL(
        new Blob([res.data], {
            type: fileType
        })
    );
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", fileName);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    URL.revokeObjectURL(url);
};
