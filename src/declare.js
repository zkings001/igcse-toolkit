var $ = require('jquery');
var M = require('materialize-css');
var production = false;
var {shell} = require('electron');
var fs = require('fs');
var mudit = "This is an Easter Egg"

$(document).ready(() => {
    var floatingBtn = document.querySelector('.fixed-action-btn');
    var floatingBtnInstance = M.FloatingActionButton.init(floatingBtn, {
        direction:'left'
    })
    var modal = document.querySelector('.modal');
    var modalInstance = M.Modal.init(modal, {});
})