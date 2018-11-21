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
                    document.getElementById('display-past-paper').innerHTML += `<a id="${theID}" onclick="openDirectoryPastPaper(this.id)" class="collection-item"><i class="icon ion-md-folder"></i> ${file.replace(/-/gi, " ")}</a>`;
                } else {
                    if (file.includes('qp')){
                        document.getElementById('display-past-paper').innerHTML += `<a id="${theID}" onclick="openFilePastPaper(this.id)" oncontextmenu="pastPaperOpenExternal(this.id)" class="collection-item waves-effect waves-yellow"><i class="icon ion-md-document"></i> ${file}<span class="badge purple grey-text text-lighten-2">question paper</span></a>`;
                    } else if (file.includes('ms')){
                        document.getElementById('display-past-paper').innerHTML += `<a id="${theID}" onclick="openFilePastPaper(this.id)" oncontextmenu="pastPaperOpenExternal(this.id)" class="collection-item waves-effect waves-yellow"><i class="icon ion-md-document"></i> ${file}<span class="badge purple grey-text text-lighten-2">marking scheme</span></a>`;
                    } else
                        document.getElementById('display-past-paper').innerHTML += `<a id="${theID}" onclick="openFilePastPaper(this.id)" oncontextmenu="pastPaperOpenExternal(this.id)" class="collection-item waves-effect waves-yellow"><i class="icon ion-md-document"></i> ${file}</a>`;
                    }
                }
            );
        }
    });
}

function openDirectoryPastPaper(id) {
    temp = id.replace(/%/gi, " ");
    backId = temp.split('/');
    backId.splice(-1, 2);
    backId = backId.join('/');
    $('#past-paper-back').html(`<button class="waves-effect waves-light btn-flat" id="${backId}" onclick="pastPaperBack(this.id)">Back</button>`);
    readPastPapers(temp);
}

function openFilePastPaper(id) {
    path = id.replace(/%/gi, " ");
    if (production) {
        path = path.split('/');
        path.splice(1, 2);
        path = path.join('/');
    }
    $('#viewer-iframe').html(`
    <iframe id="past-paper-iframe" src="${path}" frameborder="0" class="z-depth-4"></iframe>`);
}

function pastPaperOpenExternal(id) {
    temp = id.replace(/%/gi, " ");
    if (production) {
        temp = temp.split('/');
        temp.splice(1, 2);
        temp = temp.join('/');
    }
    temp = temp.split('/');
    temp.splice(0, 1);
    temp = temp.join('\\');
    finalPath = __dirname + "\\" + temp;
    shell.openItem(finalPath);
}


function pastPaperBack(id) {
    var pathRoot = './resources/app/src';
    if (!(production)){
        pathRoot = './src'
    }
    if (!(id == pathRoot)) {
        readPastPapers(id);
        temp = id
        temp = temp.split('/');
        temp.splice(-1, 1);
        temp = temp.join('/');
        $('#past-paper-back').html(`<button class="waves-effect waves-light btn-flat" id="${temp}" onclick="pastPaperBack(this.id)">Back</button>`);
    }
}


if (production){
    readPastPapers("./resources/app/src/past-papers");
}
else {
    readPastPapers("./src/past-papers");
}