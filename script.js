// Define your folder structure here

const fileStructure = {

    name: "Root",

    type: "folder",

    children: [

        {

            name: "Documents",

            type: "folder",

            children: [

                { name: "Resume.pdf", type: "file", url: "files/Documents/Resume.pdf" },

                { name: "Project Plan.docx", type: "file", url: "files/Documents/Project Plan.docx" }

            ]

        },

        {

            name: "Images",

            type: "folder",

            children: [

                { name: "vacation.jpg", type: "file", url: "files/Images/vacation.jpg" },

                { name: "logo.png", type: "file", url: "files/Images/logo.png" }

            ]

        },

        {

            name: "Music",

            type: "folder",

            children: [

                { name: "song1.mp3", type: "file", url: "files/Music/song1.mp3" }

            ]

        },

        { name: "Readme.txt", type: "file", url: "files/Readme.txt" },

        { name: "Important Notes.pdf", type: "file", url: "files/Important Notes.pdf" }

    ]

};

// Navigation history for proper breadcrumb and back

let history = [];

let currentFolder = fileStructure;

const fileList = document.getElementById('file-list');

const breadcrumb = document.getElementById('breadcrumb');

function buildBreadcrumb() {

    let path = history.map(f => f.name).join(' / ');

    breadcrumb.textContent = path ? path + ' / ' + currentFolder.name : currentFolder.name;

}

function renderFolder(folder) {

    fileList.innerHTML = '';

    // Add "Back" button if not at root

    if (history.length > 0) {

        const backItem = document.createElement('li');

        backItem.classList.add('back');

        backItem.textContent = ".. (Go Back)";

        backItem.onclick = () => {

            currentFolder = history.pop();

            renderFolder(currentFolder);

            buildBreadcrumb();

        };

        fileList.appendChild(backItem);

    }

    // Sort: folders first, then files

    const sortedChildren = [...folder.children].sort((a, b) => {

        if (a.type === b.type) return a.name.localeCompare(b.name);

        return a.type === "folder" ? -1 : 1;

    });

    sortedChildren.forEach(item => {

        const li = document.createElement('li');

        li.classList.add(item.type);

        li.textContent = item.name;

        if (item.type === "folder") {

            li.onclick = () => {

                history.push(currentFolder);

                currentFolder = item;

                renderFolder(item);

                buildBreadcrumb();

            };

        } else if (item.type === "file" && item.url) {

            li.onclick = () => {

                window.open(item.url, '_blank');

            };

        }

        fileList.appendChild(li);

    });

    buildBreadcrumb();

}

// Initial render

renderFolder(currentFolder);