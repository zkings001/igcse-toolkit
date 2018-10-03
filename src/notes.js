function readNotes(path) {
    path = path+"/";
    folderArray = [];
    fs.readdir(path, (err, files) => {
        'use strict';
        if (err) throw  err;
        $('#note-list').html(`<ul id="display-notes" class="collection scale-transition scale-in"></ul>`);
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {
                let theID = `${path.replace(/ /gi, "%")}${file.replace(/ /gi, "%")}`;
                if (err) throw err;
                if (stats.isDirectory()) {
                    document.getElementById('display-notes').innerHTML += `<a id="${theID}" onclick="openDirectoryNotes(this.id)" class="collection-item"><i class="icon ion-md-folder"></i> ${file.replace(/-/gi, " ")}</a>`;
                }
                else {
                    document.getElementById('display-notes').innerHTML += `<a id="${theID}" onclick="openFileNotes(this.id)" oncontextmenu="noteOpenExternal(this.id)" class="collection-item"><i class="icon ion-md-document"></i> ${file.replace(/-/gi, " ")}</a>`;
                }
            });
        }
        $('#display-notes').addClass('scale-out');
    });
}

function openDirectoryNotes(id) {
    temp = id.replace(/%/gi, " ");
    backId = temp.split('/');
    backId.splice(-1, 1);
    backId = backId.join('/');
    console.log(backId);
    $('#note-back').html(`<button class="waves-effect waves-light btn-flat" id="${backId}" onclick="noteBack(this.id)">Back</button>`);
    readNotes(temp);
}

function openFileNotes(id) {
    path = id.replace(/%/gi, " ");
    if (production) {
        path = path.split('/');
        path.splice(1, 2);
        path = path.join('/');
    }
    console.log(path);
    $('#viewer-iframe').html(`
    <iframe id="note-iframe" src="${path}" frameborder="0" class="z-depth-4"></iframe>
    `);
}

function noteOpenExternal(id){
    temp = id.replace(/%/gi, " ");
    if (production) {
        temp = temp.split('/');
        temp.splice(1, 2);
        temp = temp.join('/');
    }
    temp = temp.split('/');
    temp.splice(0,1);
    temp = temp.join('\\');
    finalPath = __dirname + "\\" + temp;
    console.log(finalPath);
    shell.openItem(finalPath);
}

function noteBack(id) {
    var pathRoot = './resources/app/src';
    if (!(production)) {
        pathRoot = './src'
    }
    if (!(id == pathRoot)) {
        readNotes(id);
        temp = id
        temp = temp.split('/');
        temp.splice(-1, 1);
        temp = temp.join('/');
        console.log(temp);
        $('#note-back').html(`<button class="waves-effect waves-light btn-flat" id="${backId}" onclick="noteBack(this.id)">Back</button>`);
    }
}

if (production){
    readNotes("./resources/app/src/notes")
}
else{
    readNotes("./src/notes")
}