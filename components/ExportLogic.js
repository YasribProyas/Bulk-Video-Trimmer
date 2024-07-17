import { saveAs } from "file-saver";
import { formatTime } from "./util";


export function exportCSV(decidedListArr) {
    console.log(decidedListArr);
    const csvContent = "data:text/csv;charset=utf-8,\n" + decidedListArr.map(e => e.action + "," + e.videoName + (e.markers ? ("," + e.markers.start + "," + e.markers.end) : "")).join("\n");
    alert(csvContent);
    // saveAs(csvContent, "exportedList.csv");
}

export function exportSH(decidedListArr) {
    let shContent = "#!/bin/bash\n\n";
    decidedListArr.forEach((e, i) => {
        switch (e.action) {
            case "trim":
                shContent += `ffmpeg -i "${e.file.name}" ${e.markers.start ? "-ss " + formatTime(e.markers.start) : ""} ${e.markers.end ? "-to " + formatTime(e.markers.end) : ""} -map 0:v -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a copy "output_${String(i) + e.file.name}"\n`;
                break;
            case "delete":
                shContent += `rm -f "${e.file.name}"\n`;
                break;
        }

    });
    alert(shContent);
    // saveAs(new Blob([shContent], { type: "text/plain;charset=utf-8" }), "exportedScript.sh");
}


// ffmpeg -i input.mp4 -map 0:v -map 0:a -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a:0 aac -b:a:0 160k -ac 2 -c:a:1 ac3 -b:a:1 384k -ac 6 output.mkv
// ffmpeg -i input.mp4 -map 0:v -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a copy output.mkv
// ffmpeg -i input.mp4 output.mkv