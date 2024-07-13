import { saveAs } from "file-saver";



export function exportCSV(decidedListArr) {
    const csvContent = "data:text/csv;charset=utf-8," + decidedListArr.map(e => e.videoName + "," + e.markers.start + "," + e.markers.end).join("\n");
    saveAs(csvContent, "exportedList.csv");
}

export function exportSH(decidedListArr) {
    let shContent = "#!/bin/bash\n\n";
    decidedListArr.forEach((e, i) => {
        shContent += `ffmpeg -i "${e.file.name}" ${e.markers.start ? "-ss " + e.markers.start : ""} ${e.markers.end ? "-to " + e.markers.end : ""} -map 0:v -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a copy "output${String(i) + e.file.name}"\n`;
    });
    saveAs(new Blob([shContent], { type: "text/plain;charset=utf-8" }), "exportedScript.sh");

}


// ffmpeg -i input.mp4 -map 0:v -map 0:a -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a:0 aac -b:a:0 160k -ac 2 -c:a:1 ac3 -b:a:1 384k -ac 6 output.mkv
// ffmpeg -i input.mp4 -map 0:v -map 0:a -c:v libx264 -crf 18 -preset slow -r 30 -c:a copy output.mkv