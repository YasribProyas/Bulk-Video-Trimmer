import { decidedListArrDeleteByDataIndex } from "./FileSelector";
import { formatTime } from "./util";
// import { deleteByDataIndex, decidedListArrDeleteByDataIndex } from "./ExportLogic";

export class UnDecidedVideoListItem {
    constructor(videoName, file, index) {
        this.videoName = videoName;
        this.file = file;
        this.index = index;
        this.type = "unDecided";
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "decided");
        listItem.textContent = this.videoName;
        listItem.setAttribute("data-index", this.index);
        listItem.setAttribute("data-type", this.type);
        listItem.innerHTML = `
        <span class="badge text-bg-secondary">0</span>
        <span class="name">${this.videoName}</span>`;

        return listItem;
        // <li class="list-group-item">
        //       <span class="badge text-bg-secondary">0</span>
        //       <span class="name">${name}</span>
        // </li>
    }
}

export class DecidedVideoListItem {
    constructor(videoName, file, index, markers) {
        this.videoName = videoName;
        this.file = file;
        this.index = index;
        this.type = "Decided";
        this.action = "trim";
        this.markers = { ...markers };
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        const listItem = document.createElement("li");
        // listItem.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between");
        listItem.classList.add("list-group-item", "decided");
        listItem.textContent = this.videoName;
        listItem.setAttribute("data-index", this.index);
        listItem.setAttribute("data-type", "decided");
        listItem.setAttribute("data-action", "trim");
        listItem.setAttribute("data-start", this.markers.start);
        listItem.setAttribute("data-end", this.markers.end);

        listItem.innerHTML = /* HTML */ `
            <div class="name">${this.videoName}</div>
            <span class="times">
                <span class="start-time border-end pe-1">${formatTime(this.markers.start) || "Start"}</span>
                <span class="end-time">${formatTime(this.markers.end) || "End"}</span>
            </span>
            <button class="btn btn-secondary" onclick="()=>{deleteByDataIndex(${this.index});decidedListArrDeleteByDataIndex(${this.index})}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </button>
            `;

        // delete logic
        listItem.querySelector("button").addEventListener("click", () => {
            decidedListArrDeleteByDataIndex(this.index);
            listItem.remove();
        });
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

export class DecidedDeleteListItem {
    constructor(videoName, file, index) {
        this.videoName = videoName;
        this.file = file;
        this.index = index;
        this.type = "Decided";
        this.action = "delete";
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        const listItem = document.createElement("li");
        // listItem.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between");
        listItem.classList.add("list-group-item", "decided");
        listItem.textContent = this.videoName;
        listItem.setAttribute("data-index", this.index);
        listItem.setAttribute("data-type", "decided");
        listItem.setAttribute("data-action", "delete");

        listItem.innerHTML = /* HTML */ `
            <div class="name">
                <svg class="text-danger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
                ${this.videoName}</div>
            <button class="btn btn-secondary" onclick="()=>{deleteByDataIndex(${this.index});decidedListArrDeleteByDataIndex(${this.index})}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
            </button>
            `;

        // delete logic
        listItem.querySelector("button").addEventListener("click", () => {
            decidedListArrDeleteByDataIndex(this.index);
            listItem.remove();
        });
        return listItem;
    }
}