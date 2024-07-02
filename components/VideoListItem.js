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
        listItem.classList.add("list-group-item");
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
        this.markers = { ...markers };
        this.htmlElement = this.listElementGenetor();
    }

    listElementGenetor() {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "flex-row", "justify-content-between");
        listItem.textContent = this.videoName;
        listItem.setAttribute("data-index", this.index);
        listItem.setAttribute("data-type", "decided");
        listItem.setAttribute("data-start", this.markers.start);
        listItem.setAttribute("data-end", this.markers.end);
        listItem.innerHTML = `
        <span class="name">${this.videoName}</span>
        <span class="times">
            <span class="start-time border-end pe-1">${this.markers.start || "Start"}</span>
            <span class="end-time">${this.markers.end || "End"}</span>
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