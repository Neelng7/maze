const volumeBtn = document.getElementById("volume-btn");
const audio = document.getElementById("main-menu-audio");
const gamemodeSelect = document.getElementById("gamemode-select");
const userName = document.getElementById("user-name");

//toggle background music
volumeBtn.addEventListener('click', volumeToggle);
function volumeToggle(){
    var iconClass = volumeBtn.children[0].classList    
    iconClass.toggle("fa-volume-high");
    iconClass.toggle("fa-volume-xmark");
    if(iconClass.contains("fa-volume-xmark")) audio.pause();
    else audio.play();
}

//autofill name and game mode
const previous_gamemode = sessionStorage.getItem("gameMode");
const previous_name = sessionStorage.getItem("name");
if(previous_gamemode) gamemodeSelect.value = previous_gamemode;
if(previous_name) userName.value = previous_name;

//start Game Buttons
const playGameBtn = document.getElementById("play-game");
playGameBtn.addEventListener('click', play);
function play(){
    if(userName.value.trim() == ""){
        alert("Please Enter a Name");
        userName.focus();
        return;
    }
    sessionStorage.setItem("gameMode", gamemodeSelect.value);
    sessionStorage.setItem("name", userName.value.trim());
    window.location.href = "/maze-chaser/play";
    // window.location.href = "/play.html";
}

window.addEventListener('keydown', key => {
    if(key.key == "Enter") play();
    else if(key.key == "m" || key.key == "M"){
        var iconClass = volumeBtn.children[0].classList    
        iconClass.toggle("fa-volume-high", false);
        iconClass.toggle("fa-volume-xmark", true);
        audio.pause();
    }
})