import videojs from "video.js";
import { markers, reRenderMarkers } from "./VideoPlayer.js";
import { UnDecidedVideoListItem, DecidedVideoListItem, DecidedDeleteListItem } from "./VideoListItem.js";
import { exportCSV, exportSH } from "./ExportLogic.js";

export const fileListArr = [];
export let decidedListArr = [];

export default function FileSelector() {
  document
    .getElementById("select-folder")
    .addEventListener("click", async () => {
      const folderHandle = await window.showDirectoryPicker();
      const fileList = document.getElementById("file-list-ul");
      fileList.innerHTML = "";

      let counter = 0;
      for await (const entry of folderHandle.values()) {
        // console.log(entry.kind, entry);
        if (!entry.name.endsWith(".mp4")) continue;
        // console.log(await entry.getFileHandle());
        if (entry.kind === "file") {

          const file = await entry.getFile();
          const videoListObj = new UnDecidedVideoListItem(file.name, file, counter);
          videoListObj.htmlElement.addEventListener("click", () => loadVideo(file, videoListObj.index));
          fileListArr.push(videoListObj);

          fileList.appendChild(videoListObj.htmlElement);
          counter++;

        }
        // break;
      }
    });


  const videoSource = document.getElementById("video-source");
  const videoElement = document.getElementById("my-video");
  const videoName = document.getElementById("video-name");
  const decidedFileList = document.getElementById("decided-file-list-ul");

  document.getElementById("add-list").addEventListener("click", () => {
    const index = videoName.getAttribute("data-index");
    const videoListObj = new DecidedVideoListItem(videoName.innerText, fileListArr[index].file, index, markers);
    decidedListArr.push(videoListObj);

    videoListObj.htmlElement.addEventListener("click", () => loadVideo(fileListArr[index].file, index));
    decidedFileList.appendChild(videoListObj.htmlElement);
  });
  document.getElementById("add-list-delete").addEventListener("click", () => {
    const index = videoName.getAttribute("data-index");
    const videoListObj = new DecidedDeleteListItem(videoName.innerText, fileListArr[index].file, index);
    decidedListArr.push(videoListObj);

    videoListObj.htmlElement.addEventListener("click", () => loadVideo(fileListArr[index].file, index));
    decidedFileList.appendChild(videoListObj.htmlElement);
  });

  document.getElementById("export-markers-csv").addEventListener("click", () => {
    exportCSV(decidedListArr);
  });
  document.getElementById("export-markers-sh").addEventListener("click", () => {
    exportSH(decidedListArr);
  });


  async function loadVideo(file, index) {
    markers.start = null;
    markers.end = null;
    reRenderMarkers();
    videoName.innerText = file.name;
    videoName.setAttribute("data-index", index);

    // Create a URL for the video file and set it as the source
    const fileURL = URL.createObjectURL(file);
    videoSource.type = file.type;

    // Optional: If using video.js, reset the player
    const player = videojs("my-video");
    player.src({ type: file.type, src: fileURL });
    player.load();

  }

}

export function decidedListArrDeleteByDataIndex(_index) {
  decidedListArr = decidedListArr.filter((e) => e.index != _index);
  console.log(decidedListArr);
}