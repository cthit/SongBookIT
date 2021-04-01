export const saveDownloadedFile = res => {
    // Create blob link to download
    const url = window.URL.createObjectURL(
        new Blob([res.data], {
            type: "text/markdown, encoding=utf8;",
            endings: "native"
        })
    );
    const link = document.createElement("a");
    link.href = url;
    console.log(url);
    link.setAttribute("download", `songbook.md`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
};
