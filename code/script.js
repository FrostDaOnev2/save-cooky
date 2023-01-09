
// play bg music
const bgMusic = new Audio("bgMusic.mp3")
bgMusic.play();

// Score and Cross
var score = 0;
var cross = true;

// sound effects
const gameOverSound = new Audio("dead.mp3");
const jumpSound = new Audio("jump.mp3");


// making background sound loop
bgMusic.loop = true;

setInterval(() => {
    console.log("currect time: ", bgMusic.currentTime);
}, 1000);

// Jump Animation of Character
document.onkeydown = function(e){
    if(e.keyCode == 32 || e.keyCode == 87){
        jumpSound.play();
        setTimeout(() => {
            jumpSound.pause();
            jumpSound.currentTime = 0;
        }, 500);
        var character = document.getElementById("character");
        character.classList.add("animate-character");
        setTimeout(() => {
            character.classList.remove("animate-character");
        }, 700)
    }
    if(e.keyCode == 68){
        character = document.getElementById("character");
        characterX = parseInt(window.getComputedStyle(character, null).getPropertyValue("left"));
        character.style.left = characterX + 50 + "px";
    }
    if(e.keyCode == 65){
        character = document.getElementById("character");
        characterX = parseInt(window.getComputedStyle(character, null).getPropertyValue("left"));
        character.style.left = characterX + -50 + "px";
    }
}


// Check OverGame
setInterval(() => {
    var gameOver = document.querySelector(".gameover");
    var enemy = document.querySelector(".enemy");
    
    // get character left and top value
    cx = parseInt(window.getComputedStyle(character, null).getPropertyValue("left"));
    cy = parseInt(window.getComputedStyle(character, null).getPropertyValue("top"));

    // get enemy left and top value
    ex = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"));
    ey = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("top"));

    var offsetX = Math.abs(cx-ex)
    var offsetY = Math.abs(cy-ey)
    if (offsetX < 40 && offsetY < 52) {
        gameOverSound.play();
        bgMusic.pause();
        bgMusic.currentTime = 0;
        gameOver.style.visibility = "visible";
        enemy.classList.remove("animate-enemy")
    }
    else if(offsetX < 44 && cross){
        score++;
        updateScore(score)
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        
        // increase speed per score
        var incSpeed = setTimeout(() => {
            eDur = parseFloat(window.getComputedStyle(enemy, null).getPropertyValue("animation-duration"));
            neDur = eDur - 0.1;
            enemy.style.animationDuration = neDur + "s";
        }, 500);
        if (neDur < 3 || neDur == 3) {
            clearTimeout(incSpeed);
        }
        console.log(neDur)
    }
}, 10);

function updateScore(score){
    scoreCount = document.querySelector(".score-count");
    scoreCount.innerHTML = "Your Score: " + score;
}

// restart
function redirect(){
    window.location.href = "http://127.0.0.1:5500/AvoidGame/index.html";
}
