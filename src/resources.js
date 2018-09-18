
function readResource(path) {
    path = path + "/";
    fs.readdir(path, (err, files) => {
        'use strict';
        if (err) throw err;
        $('#resource-list').html(`<ul id="display-resources" class="collection scale-transition scale-in"></ul>`);
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {
                let theID = `${path.replace(/ /gi, "%")}${file.replace(/ /gi, "%")}`;
                if (err) throw err;
                if (stats.isDirectory()) {
                    document.getElementById('display-resources').innerHTML += `<a id="${theID}" onclick="openDirectoryResources(this.id)" class="collection-item"><i class="icon ion-md-folder"></i> ${file.replace(/-/gi, " ")}</a>`;
                } else {
                    document.getElementById('display-resources').innerHTML += `<a id="${theID}" onclick="openFileResources(this.id)" oncontextmenu="resourceOpenExternal(this.id)" class="collection-item"><i class="icon ion-md-document"></i> ${file.replace(/-/gi, " ")}</a>`;
                }
            });
        }
        $('#display-notes').addClass('scale-out');
    });
}

function openDirectoryResources(id) {
    temp = id.replace(/%/gi, " ");
    backId = temp.split('/');
    backId.splice(-1, 1);
    backId = backId.join('/');
    console.log(backId);
    $('#resource-back').html(`<button class="btn green btn-flat white-text lighten-2" id="${temp}" onclick="resourceBack(this.id)"><i class="icon ion-md-arrow-round-back"></i></button>`);
    readResource(temp);
}

function openFileResources(id) {
    path = id.replace(/%/gi, " ");
    if (production){
        path = path.split('/');
        path.splice(1,2);
        path = path.join('/');
    }
    console.log(path);
    $('#viewer-iframe').html(`
    <br>
    <iframe id="resource-iframe" src="${path}" frameborder="0" class="z-depth-5 scale-transition scale-out"></iframe>
    `);
    setTimeout(() => {
        $('#resource-iframe').removeClass('scale-out');
        $('#resource-iframe').addClass('scale-in')
    }, 500)
}

function resourceOpenExternal(id){
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


function resourceBack(id) {
    var pathRoot = './resources/app/src';
    if (!(production)) {
        pathRoot = './src'
    }
    if (!(id == pathRoot)) {
        readResource(id);
        temp = id
        temp = temp.split('/');
        temp.splice(-1, 1);
        temp = temp.join('/');
        console.log(temp);
        $('#resource-back').html(`<button class="btn green btn-flat white-text lighten-2" id="${temp}" onclick="resourceBack(this.id)"><i class="icon ion-md-arrow-round-back"></i></button>`);
    }
}

if (production){
    readResource("./resources/app/src/resources");
}
else {
    readResource("./src/resources");
}