export default function DecidedListHandler() {
    const decidedFileList = document.getElementById("decided-file-list-ul");

    document.getElementById("add-list").addEventListener("click", () => {
        const index = videoName.getAttribute("data-index");
        const listItem = listItemGenetor(videoName.innerText, index, "decided");
        listItem.addEventListener("click", () => loadVideo(fileListArr[index], index));

        decidedFileList.appendChild(listItem);
    });
}