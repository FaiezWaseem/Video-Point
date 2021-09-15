/* Code By Webdevtrick ( https://webdevtrick.com ) */
var videoPlayer = function(){
    "use strict";

    function el(id) {
        return document.getElementById(id);
    }

    var vid = el("video"),

        btnState = el("btnState"),
        btnReplay = el("btnReplay"),
        btnSound = el("btnSound"),
        sliderVolume = el("sliderVolume"),

        barSeeker = el("barSeeker"),
        barBuffer = el("barBuffer"),
        barProgress = el("barProgress"),

        timePlayed = el("timePlayed"),
        timeDuration = el("timeDuration"),
        timeBubble = el("timeBubble"),

        thePosition,
        theMinutes,
        theSeconds,
        theTime;

    var readableTime = function(t) {
        theMinutes = "0" + Math.floor(t / 60); // Divide seconds to get minutes, add leading zero
        theSeconds = "0" + parseInt(t % 60); // Get remainder seconds
        theTime = theMinutes.slice(-2) + ":" + theSeconds.slice(-2); // Slice to two spots to remove excess zeros
        return theTime;
    };

    /* Video controls */

    var togglePlay = function(){
        if(vid.paused) {
            vid.play();
            btnState.firstElementChild.className = "fontawesome-pause";
            btnReplay.style.display = "none";
            vid.style.opacity = 1;
        } else {
            vid.pause();
            btnState.firstElementChild.className = "fontawesome-play";
        }
    };

    var toggleSound = function(){
        if(vid.muted) {
            vid.muted = false;
            sliderVolume.value = 10;
            btnSound.firstElementChild.className = "fontawesome-volume-up";
        } else {
            vid.muted = true;
            sliderVolume.value = 0;
            btnSound.firstElementChild.className = "fontawesome-volume-off";
        }
    };

    /* Update seeker value and time played */
    var updateTimeDisplay = function() {
        var timePercent = (100 / vid.duration) * vid.currentTime;
        barSeeker.value = timePercent;
        barProgress.value = timePercent;
        timePlayed.innerHTML = readableTime(vid.currentTime);
    };

    var replayVideo = function() {
        vid.currentTime = 0;
        btnState.firstElementChild.className = "fontawesome-pause";
        btnReplay.style.display = "none";
        vid.play();
    };

    // Toggle buttons
    vid.addEventListener('loadedmetadata',togglePlay)
    vid.addEventListener("click",togglePlay);
    btnState.addEventListener("click",togglePlay);
    btnSound.addEventListener("click",toggleSound);

    // Volume slider
    sliderVolume.addEventListener("change", function() {
        var theVolume = sliderVolume.value / 10;
        vid.volume = theVolume;

        if(theVolume === 0) {
            btnSound.firstElementChild.className = "fontawesome-volume-off";
        } else if (theVolume === 1) {
            btnSound.firstElementChild.className = "fontawesome-volume-up";
        } else {
            btnSound.firstElementChild.className = "fontawesome-volume-down";
        }
    });

    // Move seeker bar
    vid.addEventListener("timeupdate",updateTimeDisplay);

    // Allow click on seeker to change video position
    barSeeker.addEventListener("change", function() {
        thePosition = vid.duration * (barSeeker.value / 100);
        vid.currentTime = thePosition;
    });

    // Pause video and seeker update while seeker is being interacted with
    barSeeker.addEventListener("mousedown",function(){
        vid.pause();
        vid.removeEventListener("timeupdate",updateTimeDisplay);
    });

    barSeeker.addEventListener("mouseup",function(){
        vid.play();
        btnState.firstElementChild.className = "fontawesome-pause";
        vid.addEventListener("timeupdate",updateTimeDisplay);
    });

    // Buffer bar
    vid.addEventListener("timeupdate", function() {
        var bufferPercent = (100 / vid.duration) * vid.buffered.end(vid.buffered.length - 1);
        barBuffer.value = bufferPercent;
    });

    // Video length
    vid.addEventListener('loadeddata', function(){
        timeDuration.innerHTML = readableTime(vid.duration);
    });

    // Time bubble on seeker
    var bubblePop = function(e){
        var cursorPos = (e.clientX - (barSeeker.getBoundingClientRect().left)) / (barSeeker.offsetWidth);
        var seekTime = cursorPos * vid.duration;

        if(seekTime) {
            timeBubble.innerHTML = readableTime(seekTime);
            timeBubble.style.left = (e.clientX - barSeeker.getBoundingClientRect().left + 78) + "px";
            timeBubble.style.display = "block";
        }
    };

    barSeeker.addEventListener("mousemove", bubblePop);

    barSeeker.addEventListener("mouseout", function(){
        timeBubble.style.display = "none";
    });

}();
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
