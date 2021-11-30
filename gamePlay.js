let score = document.querySelector(".score");
let startScreen = document.querySelector(".startScreen");
let gameArea = document.querySelector(".gameArea");
let player = {
    speed: 7,
    score: 0
};
//tạo đối tượng để theo dõi
let keys = {ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function start() {
    startScreen.classList.add("hide");
    gameArea.innerHTML = "";
    // gameArea.classList.remove("hide");
    player.start = true;
    player.score = 0;
    for (let i = 0; i < 10; i++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = i * 150;
        div.style.top = (i * 150) + "px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    car.setAttribute("class", "car"); //set cho div vua tao mot thuoc tính của oto
    gameArea.appendChild(car); //add car vào trong
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for (let j = 0; j < 3; j++) {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = ((j + 1) * 600) * -1;
        enemy.style.top = (j * 150) + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
        enemy.style.backgroundColor = "red";
        gameArea.appendChild(enemy);
    }
}
function endGame(){
    player.start = false;
    score.innerHTML = "GameOver <br> Score was "+player.score;
    startScreen.classList.remove("hide")
}

function checkCollide(a, b) {
    //lấy giá trị kích thước của
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLine() {
    let lines = document.querySelectorAll(".line");
    lines.forEach(function (item) {
        if (item.y >= 1500) {
            item.y -= 1500
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function moveEnemy(car) {
    let ene = document.querySelectorAll(".enemy");
    ene.forEach(function (item) {
        if (checkCollide(car, item)) {
            endGame();
        }
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 150) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function playGame() {
    let car = document.querySelector(".car");
    moveLine();
    moveEnemy(car);
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top + 70) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }
        player.score++;
        score.innerText ="Score "+ player.score;
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
        window.requestAnimationFrame(playGame)
    }
}

function pressOn(e) {
    e.preventDefault(); //ngăn hành động mặc định
    keys[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}