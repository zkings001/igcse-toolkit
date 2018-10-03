var $ = require('jquery');
var jQuery = require('jquery');
var M = require('materialize-css');
var production = false;
var {shell,remote,BrowserWindow} = require('electron');
var fs = require('fs');
var mudit = "This is an Easter Egg"
var win = remote.getCurrentWindow()

$(document).ready(() => {
    var floatingBtn = document.querySelector('.fixed-action-btn');
    var floatingBtnInstance = M.FloatingActionButton.init(floatingBtn, {
        direction: 'left'
    })
    var modalTime = document.querySelector('.timeModal');
    var modalTimeInstance = M.Modal.init(modalTime, {});
    var modalOnline = document.querySelector('.onlineModal');
    var modalOnlineInstance = M.Modal.init(modalOnline, {});
    var tabs = document.querySelector('.tabs');
    var tabInstance = M.Tabs.init(tabs, {});
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
            $('#timerView').text("");
            var beep = new Audio();
            if (production){
                beep.src = "./resources/app/dist/alarm.mp3";
            } else{
                beep.src = "./dist/alarm.mp3";
            }
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