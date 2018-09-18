var $ = require('jquery');
var M = require('materialize-css');
var production = false;
var {shell, remote} = require('electron');
var fs = require('fs');
var mudit = "This is an Easter Egg"
var win = remote.getCurrentWindow()

$(document).ready(() => {
    var floatingBtn = document.querySelector('.fixed-action-btn');
    var floatingBtnInstance = M.FloatingActionButton.init(floatingBtn, {
        direction:'left'
    })
    var modal = document.querySelector('.modal');
    var modalInstance = M.Modal.init(modal, {});
});

// Menu Buttons
$('#win-maximize').click(() => {
    console.log('Hello');
    if(!win.isMaximized()){
        win.maximize();
    } else {
        win.unmaximize();
    }
});

$("#win-minimize").click(() => {
    win.minimize();
});

$("#win-close").click(() => {
    win.close();
});