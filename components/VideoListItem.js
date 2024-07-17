import { decidedListArrDeleteByDataIndex } from "./FileSelector";
import { formatTime } from "./util";
// import { deleteByDataIndex, decidedListArrDeleteByDataIndex } from "./ExportLogic";

export class VideoListItem {

    static icons = {
        deleteBasket:
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
        </svg>`
    }

    constructor(file, index) {
        this.file = file;
        this.index = index;
        this.action = undefined;
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        const listItem = this.baseListElementGenetor();
        listItem.classList.add("undefined");

        listItem.innerHTML = /* HTML */ `
        <span class="badge text-bg-secondary">0</span>
        <span class="name">${this.file.name}</span>`;

        return listItem;
    }

    baseListElementGenetor() {
        const listItem = document.createElement("li");
        listItem.textContent = this.file.name;
        listItem.setAttribute("data-index", this.index);
        listItem.setAttribute("data-action", this.action);
        listItem.classList.add("list-group-item");
        return listItem;
    }
}

export class TrimVideoListItem extends VideoListItem {
    constructor(file, index, markers) {
        super(file, index);
        this.markers = { ...markers };
        this.action = "Trim";
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        if (!this.markers) return;

        const listItem = this.baseListElementGenetor();
        listItem.classList.add("trim");

        listItem.setAttribute("data-start", this.markers.start);
        listItem.setAttribute("data-end", this.markers.end);

        listItem.innerHTML = /* HTML */ `
        <div class="name">${this.file.name}</div>
        <span class="times">
            <span class="start-time border-end pe-1">${formatTime(this.markers.start) || "Start"}</span>
            <span class="end-time">${formatTime(this.markers.end) || "End"}</span>
        </span>
        <button class="btn btn-secondary" onclick="()=>{deleteByDataIndex(${this.index});decidedListArrDeleteByDataIndex(${this.index})}">
            ${this.constructor.icons.deleteBasket}
        </button>
        `;

        listItem.querySelector("button").addEventListener("click", () => {
            decidedListArrDeleteByDataIndex(this.index);
            listItem.remove();
        });

        return listItem;
    }

}

export class DeleteVideoListItem extends VideoListItem {
    constructor(...args) {
        super(...args);
        this.action = "Delete";
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        const listItem = this.baseListElementGenetor();
        listItem.classList.add("delete");

        listItem.innerHTML = /* HTML */ `
        <div class="name"><span class="text-danger">${this.constructor.icons.deleteBasket}</span>
        ${this.file.name}</div>
        <button class="btn btn-secondary" onclick="()=>{deleteByDataIndex(${this.index});decidedListArrDeleteByDataIndex(${this.index})}">
            ${this.constructor.icons.deleteBasket}
        </button>
        `;

        listItem.querySelector("button").addEventListener("click", () => {
            decidedListArrDeleteByDataIndex(this.index);
            listItem.remove();
        });

        return listItem;
    }

}