import videojs from "video.js";

export default function FileSelector() {
  document
    .getElementById("select-folder")
    .addEventListener("click", async () => {
      const folderHandle = await window.showDirectoryPicker();
      const fileList = document.getElementById("file-list-ul");
      fileList.innerHTML = "";

      for await (const entry of folderHandle.values()) {
        if (!entry.name.endsWith(".mp4")) continue;
        console.log(entry.kind, entry);
        // console.log(await entry.getFileHandle());
        if (entry.kind === "file") {
          const file = await entry.getFile();
          // const listItem = document.createElement("div");
          const listItem = document.createElement("li");
          listItem.textContent = file.name;
          listItem.addEventListener("click", () => loadVideo(file));
          fileList.appendChild(listItem);
        }
        break;
      }
    });

  async function loadVideo(file) {
    const videoSource = document.getElementById("video-source");
    const videoElement = document.getElementById("my-video");

    // Create a URL for the video file and set it as the source
    const fileURL = URL.createObjectURL(file);
    videoSource.type = file.type;

    // Optional: If using video.js, reset the player
    const player = videojs("my-video");
    player.src({ type: file.type, src: fileURL });
    player.load();
  }
}
