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

}

export function reRenderMarkers() {
  // Remove all markers
  const progressControl = player.controlBar.progressControl;
  const markersDiv = progressControl.el().querySelectorAll('.marker');
  markersDiv.forEach(markerDiv => markerDiv.remove());

  // Re-render all markers
  if (markers.start) addMarker(markers.start, 'start');
  if (markers.end) addMarker(markers.end, 'end');
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