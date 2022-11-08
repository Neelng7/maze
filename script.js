const volumeBtn = document.getElementById("volume-btn");
const audio = document.getElementById("main-menu-audio");
const gamemodeSelect = document.getElementById("gamemode-select");
const userName = document.getElementById("user-name");

volumeBtn.addEventListener('click', volumeToggle);
function volumeToggle(){
    var iconClass = volumeBtn.children[0].classList    
    iconClass.toggle("fa-volume-high");
    iconClass.toggle("fa-volume-xmark");
    if(iconClass.contains("fa-volume-xmark")) audio.pause();
    else audio.play();
}

const playGameBtn = document.getElementById("play-game");
playGameBtn.addEventListener('click', play);
function play(){
    if(userName.value.trim() == ""){
        alert("Please Enter a Name");
        userName.focus();
        return;
    }
    sessionStorage.setItem("gameMode", gamemodeSelect.value);
    window.location.href = "/play.html";
}

window.addEventListener('keydown', key => {
    if(key.key == "Enter") play();
})