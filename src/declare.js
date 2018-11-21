var $ = require('jquery');
var jQuery = require('jquery');
var M = require('materialize-css');
var production = true;
var {shell,remote,BrowserWindow} = require('electron');
var fs = require('fs');
var mudit = "This is an Easter Egg"
var win = remote.getCurrentWindow()

$(document).ready(() => {
    var modalTime = document.querySelector('.timeModal');
    var modalTimeInstance = M.Modal.init(modalTime, {});
    var modalOnline = document.querySelector('.onlineModal');
    var modalOnlineInstance = M.Modal.init(modalOnline, {});
    var info = document.querySelector('.infoModal');
    var infoInstance = M.Modal.init(info, {});
    var resource = document.querySelector('.resourceModal');
    var resourceInstance = M.Modal.init(resource, {});
    var tabs = document.querySelector('.tabs');
    var tabInstance = M.Tabs.init(tabs, {});
    var materialbox = document.querySelectorAll('.materialboxed');
    var materialboxed = M.Materialbox.init(materialbox, {});
});

$(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

$("#home-open").click(() => {
    shell.openItem(__dirname);
})

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
            $('#timerView').text("");
            var beep = new Audio();
            beep.src = "./dist/alarm.mp3";
            beep.play();
            M.toast({
                html: 'Timer Done <a class="btn-flat blue-text" id="timerStop">Stop Timer</a>',
                displayLength: 10000
            });
            $('#timerStop').click(function () {
                beep.pause();
                beep.currentTime = 0;
            });
            return;   
        }
        var seconds = count % 60;
        var minutes = Math.floor(count / 60);
        var hours = Math.floor(minutes / 60);
        minutes %= 60;
        hours %= 60;
        if (hours == 0 && minutes == 1){
            M.toast({html: 'A Minute Left', classes: 'red lighten-1'})
        }
        if (hours == 0 && minutes == 0 && seconds == 30){
            M.toast({html: '30 seconds Left', classes: 'red lighten-1'})
        }
        $('#timerView').text(`${hours}:${minutes}:${seconds}`);
    }
});

var sidebar = true;

function toggleSide() {
    if (sidebar) {
        $('.navigation').css('display', 'none');
        $('.view').removeClass('m7');
        $('.view').addClass('m12');
        $('#toggle-sidebar').html('<i class="icon ion-md-arrow-dropright"></i>');
        sidebar = false;
    } else {
        $('.navigation').css('display', 'block');
        $('.view').removeClass('m12');
        $('.view').addClass('m7');
        $('#toggle-sidebar').html('<i class="icon ion-md-arrow-dropleft"></i>');
        sidebar = true;
    }
}

$('#toggle-sidebar').click(function () {
    toggleSide()
})