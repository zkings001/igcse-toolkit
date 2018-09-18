var $ = require('jquery');
var M = require('materialize-css');
var production = true;
var {shell,remote} = require('electron');
var fs = require('fs');
var mudit = "This is an Easter Egg"
var win = remote.getCurrentWindow()

$(document).ready(() => {
    var floatingBtn = document.querySelector('.fixed-action-btn');
    var floatingBtnInstance = M.FloatingActionButton.init(floatingBtn, {
        direction: 'left'
    })
    var modal = document.querySelector('.modal');
    var modalInstance = M.Modal.init(modal, {});
});

// Menu Buttons
$('#win-maximize').click(() => {
    console.log('Hello');
    if (!win.isMaximized()) {
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

$(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

//Timer Create
$('#timerCreate').click(() => {
    var hour = $('#hoursTimer').val();
    var min = $('#minTimer').val();
    var count = hour*60*60 + min*60;
    var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

    function timer() {
        count = count - 1;
        if (count == -1) {
            clearInterval(counter);
            $('#timerView').text("Timer Done");
            return;
            
        }

        var seconds = count % 60;
        var minutes = Math.floor(count / 60);
        var hours = Math.floor(minutes / 60);
        minutes %= 60;
        hours %= 60;

        $('#timerView').text(`${hours}:${minutes}:${seconds}`);
    }

});