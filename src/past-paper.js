const fs = require('fs');
const $ = require('jquery');

const {
    shell
} = require('electron');

function readPastPapers(path) {
    path = path + "/";
    fs.readdir(path, (err, files) => {
        'use strict';
        if (err) throw err;
        $('#past-paper-list').html(`<ul id="display-past-paper" class="collection"></ul>`);
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {
                let theID = `${path.replace(/ /gi, "%")}${file.replace(/ /gi, "%")}`;
                if (err) throw err;
                if (stats.isDirectory()) {
                    document.getElementById('display-past-paper').innerHTML += `<li id="${theID}" onclick="openDirectoryPastPaper(this.id)" class="collection-item"><i class="icon ion-md-folder"></i> ${file.replace(/-/gi, " ")}</li>`;
                } else {
                    document.getElementById('display-past-paper').innerHTML += `<li id="${theID}" onclick="openFilePastPaper(this.id)" oncontextmenu="pastPaperOpenExternal(this.id)" class="collection-item"><i class="icon ion-md-document"></i> ${file}</li>`;
                }
            });
        }
    });
}

function openDirectoryPastPaper(id) {
    temp = id.replace(/%/gi, " ");
    backId = temp.split('/');
    backId.splice(-1, 1);
    backId = backId.join('/');
    console.log(backId);
    $('#past-paper-back').html(`<button class="btn blue lighten-2" id="${backId}" onclick="pastPaperBack(this.id)"><i class="icon ion-md-arrow-back"></i> Back</button>`);
    readPastPapers(temp);
}

function openFilePastPaper(id) {
    path = id.replace(/%/gi, " ");
    console.log(path);
    $('#viewer-iframe').html(`<br>
    <iframe id="past-paper-iframe" src="${path}" frameborder="0" class="z-depth-5 scale-transition scale-out"></iframe>`);
    setTimeout(() => {
        $('#past-paper-iframe').removeClass('scale-out');
        $('#past-paper-iframe').addClass('scale-in')
    }, 500)
}

function pastPaperOpenExternal(id) {
    temp = id.replace(/%/gi, " ");
    temp = temp.split('/');
    temp.splice(0, 1);
    temp = temp.join('\\');
    finalPath = __dirname + "\\" + temp;
    console.log(finalPath);
    shell.openItem(finalPath);
}


function pastPaperBack(id) {
    if (!(id == './src')) {
        readPastPapers(id);
        temp = id
        temp = temp.split('/');
        temp.splice(-1, 1);
        temp = temp.join('/');
        console.log(temp);
        $('#past-paper-back').html(`<button class="btn blue lighten-2" id="${temp}" onclick="pastPaperBack(this.id)"><i class="icon ion-md-arrow-back"></i> Back</button>`);
    }
}


readPastPapers("./src/past-papers");