"use strict"

var timer = document.getElementById("timer");
var counter = 0;
var timeleft = 4;
var interval = setInterval(timeIt, 1000);

// *.html?hours=2&minutes=37&seconds=59
if (window.location.search) {
    timeleft = 0;
    var urlParams = new URLSearchParams(window.location.search);
    if (parameterURL("h")){
        timeleft += parameterURL("h") * 3600;
    }
    if (parameterURL("m")){
        timeleft += parameterURL("m") * 60;
    }
    if (parameterURL("s")){
        timeleft += parameterURL("s");
    }
}

var audioDing = new Audio("ding-sound-effect_2.mp3");

function parameterURL(timeUnit) {
    var timeUnitValue = urlParams.get(timeUnit);
    return (timeUnitValue) ? parseInt(timeUnitValue) : 0;
}

function timeFormat(timeQuatity) {
    return (timeQuatity < 10) ? ("0" + timeQuatity) : timeQuatity;
}

function convertSeconds(s) {
    var h = Math.trunc(s / 3600);
    s -= h * 3600
    var m = Math.trunc(s / 60);
    s -= m * 60;
    return timeFormat(h) + "h : " +
        timeFormat(m) + "m : " +
        timeFormat(s) + "s";
}

function timeIt() {
    timer.textContent = convertSeconds(timeleft - counter);
    counter++;
    if (timeleft == counter - 1) {
        clearInterval(interval);
        timer.textContent += " - Time's up!";
        counter = 0;
        audioDing.play();
    }
}