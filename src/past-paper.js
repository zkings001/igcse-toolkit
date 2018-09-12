const fs = require('fs');
const $ = require('jquery');

const {shell} = require('electron');

function readPastPapers(path) {
    path = path+"/";
    fs.readdir(path, (err, files) => {
        'use strict';
        if (err) throw  err;
        document.getElementById('past-paper-div').innerHTML = `<ul id="display-past-paper" class="collection"></ul>`;
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {
                let theID = `${path.replace(" ", "?")}${file.replace(" ", "?")}`;
                if (err) throw err;
                if (stats.isDirectory()) {
                    document.getElementById('display-past-paper').innerHTML += `<li id=${theID} onclick="openDirectory(this.id)" class="collection-item"><i class="icon ion-md-folder"></i> ${file.replace("-", " ")}</li>`;
                }
                else {
                    document.getElementById('display-past-paper').innerHTML += `<li id=${theID} onclick="openFile(this.id)" class="collection-item"><i class="icon ion-md-document"></i> ${file}</li>`;
                }
            });
        }
    });
}

function openDirectory(id){
    temp = id.replace("?", " ")
    readPastPapers(temp);
}

function openFile(id){
    path = id.replace("?", " ");
    console.log(path);
    shell.openItem(path);
}

readPastPapers("./src/past-papers");