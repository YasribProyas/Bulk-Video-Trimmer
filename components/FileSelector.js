import videojs from "video.js";
import { markers } from "./VideoPlayer.js";


export default function FileSelector() {

  const fileListArr = []

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
          fileListArr.push(file);
          // const listItem = document.createElement("div");
          // const listItem = document.createElement("li");
          const listItem = listItemGenetor(file.name, counter);
          // console.log(listItem);
          // listItem.textContent = file.name;
          listItem.addEventListener("click", () => loadVideo(file, listItem.getAttribute("data-index")));
          fileList.appendChild(listItem);
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
    const listItem = decidedListItemGenetor(videoName.innerText, index);
    listItem.addEventListener("click", () => loadVideo(fileListArr[index], index));

    decidedFileList.appendChild(listItem);
  });

  async function loadVideo(file, index) {
    markers.start = null;
    markers.end = null;
    console.log(markers);
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

  function listItemGenetor(name, index, type = "unDecided") {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.setAttribute("data-index", index);
    listItem.innerHTML = `
          ${type == "unDecided" ? '<span class="badge text-bg-secondary">0</span>' : ''}
          <span class="name">${name}</span>`;
    return listItem;
    // `<li class="list-group-item">
    //       <span class="badge text-bg-secondary">0</span>
    //       <span class="name">${name}</span>
    // </li>`
  }

  function decidedListItemGenetor(name, index) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between");
    listItem.setAttribute("data-index", index);
    listItem.setAttribute("data-start", markers.start);
    listItem.setAttribute("data-end", markers.end);

    listItem.innerHTML = `
      <span class="name">${name}</span>
      <span class="times">
        <span class="start-time border-end pe-1">${markers.start || "Start"}</span>
        <span class="end-time">${markers.end || "End"}</span>
      </span>`;
    return listItem;

    // <li class="list-group-item d-flex flex-row justify-content-between">
    //   <span class="name">Lorem ipsum dolor sit amet</span>
    //   <span class="times">
    //     <span class="start-time border-end pe-1">00:00</span>
    //     <span class="end-time">00:00</span>
    //   </span>
    // </li>
  }
}

