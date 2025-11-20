let firstNum = document.getElementById("firstNumber");
let secondNum = document.getElementById("secondNumber");
let resultMsg = document.getElementById("result");
let userInput = document.getElementById("userInput");
let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("highScore");

let score = 0;
let highScore = localStorage.getItem("highestScore")
    ? parseInt(localStorage.getItem("highestScore"))
    : 0;

let firstAttempt = true;

highScoreDisplay.textContent = highScore;

// Generate numbers
function generateNumbers() {
    firstNum.textContent = Math.ceil(Math.random() * 100);
    secondNum.textContent = Math.ceil(Math.random() * 100);
    firstAttempt = true; // reset every time a new question appears
}

// Check answer
function checkAnswer() {
    let correctSum = parseInt(firstNum.textContent) + parseInt(secondNum.textContent);
    let userValue = userInput.value;

    if (userValue === "") {
        resultMsg.textContent = "Please enter answer!";
        resultMsg.style.backgroundColor = "blue";
        return;
    }

    if (parseInt(userValue) === correctSum) {

        if (firstAttempt === true) {
            score++;
            scoreDisplay.textContent = score;
        }

        resultMsg.textContent = "Correct!";
        resultMsg.style.backgroundColor = "green";

        userInput.value = "";
        generateNumbers(); // resets firstAttempt automatically

        // DO NOT SET firstAttempt = false HERE
        return;
    }

    // WRONG ANSWER → GAME OVER
    resultMsg.textContent = "Game Over!";
    resultMsg.style.backgroundColor = "red";

    setTimeout(() => {
        alert(" Game Over!\nYour Score: " + score);

        // Update highest score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highestScore", highScore);
            highScoreDisplay.textContent = highScore;
        }

        restartGame();
    }, 300);
}


function restartGame() {
    score = 0;
    scoreDisplay.textContent = 0;
    userInput.value = "";
    resultMsg.textContent = "";
    resultMsg.style.backgroundColor = "transparent";
    generateNumbers();
}

generateNumbers();
