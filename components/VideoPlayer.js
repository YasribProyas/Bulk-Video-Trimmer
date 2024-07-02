import videojs from "video.js";
import { saveAs } from "file-saver";

// const markers = { start: null, end: null };
export const markers = { start: null, end: null };
export default function VideoPlayer() {

  const player = videojs("my-video");

  document.getElementById("mark-start").addEventListener("click", () => {
    updateMarkers(player.currentTime(), "start");
    console.log(`Start marked at: ${markers.start}`);
    reRenderMarkers();
  });

  document.getElementById("mark-end").addEventListener("click", () => {
    updateMarkers(player.currentTime(), "end");
    console.log(`End marked at: ${markers.end}`);
    reRenderMarkers();

    // Optionally, add a marker for the end time as well
  });

  document.getElementById("export-markers").addEventListener("click", () => {
    exportMarkers(markers);
  });



  function exportMarkers(exportedMarkers) {
    const ffmpegScript = `ffmpeg -i input.mp4 -ss ${exportedMarkers.start} -to ${exportedMarkers.end} -c copy output.mp4`;
    const blob = new Blob([ffmpegScript], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "cut_video.sh");
  }

  function reRenderMarkers() {
    // Remove all markers
    const progressControl = player.controlBar.progressControl;
    const markersDiv = progressControl.el().querySelectorAll('.marker');
    markersDiv.forEach(markerDiv => markerDiv.remove());

    // Re-render all markers
    if (markers.start) addMarker(markers.start, 'start');
    if (markers.end) addMarker(markers.end, 'end');
  }
  function updateMarkers(time, type) {
    const requestedTime = Math.round(time * 1000) / 1000
    if (type == "start") {
      let distance = markers.start - requestedTime;
      markers.start = requestedTime;
      if (markers.end && markers.end < markers.start) markers.end = markers.end - distance;
      if (markers.end > player.duration()) markers.end = null;
      // console.log(markers.end, markers.start, player.duration());
    }
    else if (type == "end") {
      let distance = markers.end - requestedTime;
      markers.end = time == player.duration() ? null : requestedTime;
      if (markers.start && markers.start > markers.end) markers.start = markers.start - distance;
      if (markers.start < 0) markers.start = 0.0;

    }

  }

  function addMarker(time, type) {
    const progressControl = player.controlBar.progressControl;
    // const progressSlider = progressControl.el().querySelector("#vjs-slider");
    const duration = player.duration();
    const position = (time / duration) * progressControl.width();

    // Create the marker element
    const marker = document.createElement('div');
    marker.classList.add('marker', 'marker-' + type);
    marker.style.position = 'absolute';
    marker.style.height = '100%';
    marker.style.width = '2px'; // Adjust the width of the marker as needed
    marker.style.backgroundColor = type == "start" ? 'yellow' : 'red';
    marker.style.left = `${position}px`;

    // Append the marker to the progress control element
    progressControl.el().appendChild(marker);
    // progressSlider.appendChild(marker);
  }
}

// ffmpeg -i input.mp4 -map 0:v -map 0:a -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a:0 aac -b:a:0 160k -ac 2 -c:a:1 ac3 -b:a:1 384k -ac 6 output.mkv