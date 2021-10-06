// all html selectors used
let body = document.querySelector("body");
let landingPage = document.querySelector(".main-container")
let highscoreButton = document.querySelector("button")
let beginQuizButton = document.getElementById("begin-quiz")
let scoreInput = document.getElementById("score-input")
let userInitial = document.getElementById("user-initial")
let submitScore = document.getElementById("submit-score")
let finalScore = document.getElementById("final-score")
let timer = document.querySelector("h1");
let highscoreContainer = document.getElementById("highscores");
let highscoreList = document.getElementById("highscore-list")
let homeButton = document.getElementById("home-button")
let clearHighscores = document.getElementById("clear-highscores")

// timer specific variables
let questionCounter = 0;
let initialTime = 60;
let timerSwitch = false;

// quiz game html elements
let mainDiv = document.createElement("div");
let questionTitle = document.createElement("h2");
let option1 = document.createElement("button");
let option2 = document.createElement("button");
let option3 = document.createElement("button");
let option4 = document.createElement("button");
let revealedAnswer = document.createElement("h3")

// user Highscore goes here
let userStorage = {
    initials: "",
    score: 0
}

// quiz game questions
let questions = [
    {
        question: "What is a Boolean in Javascript?",
        option1: "false",
        option2: "string",
        option3: "number",
        option4: "variable",
        answer: "false"
    },
    {
        question: "What is used for styling HTML?",
        option1: "JavaScript",
        option2: "CSS",
        option3: "Django",
        option4: "React",
        answer: "CSS"
    },
    {
        question: "What is it called when you combine strings?",
        option1: "combining",
        option2: "terraforming",
        option3: "merging",
        option4: "concatination",
        answer: "concatination"
    }
]

//timer
let countdown = function () {
    timerSwitch = true;
    let timeInterval =  setInterval(function() {
        if (initialTime > 0 && questionCounter < questions.length && timerSwitch) {
            initialTime--;
            timer.textContent = initialTime;
        } else {
            clearInterval(timeInterval);
            timer.textContent = "";
        }
    }, 1000)
}


//handles initial start game
let startGame = function () {
    initialTime = 60;
    timer.textContent = initialTime;
    countdown();

    questionCounter = 0;
    mainDiv.removeEventListener("click", onDivClick);
    revealedAnswer.textContent = "";

    questionTitle.textContent = questions[questionCounter].question;
    option1.textContent = questions[questionCounter].option1;
    option1.setAttribute("value", questions[questionCounter].option1)
    option2.textContent = questions[questionCounter].option2;
    option2.setAttribute("value", questions[questionCounter].option2)
    option3.textContent = questions[questionCounter].option3;
    option3.setAttribute("value", questions[questionCounter].option3)
    option4.textContent = questions[questionCounter].option4;
    option4.setAttribute("value", questions[questionCounter].option4)

    mainDiv.appendChild(questionTitle);
    mainDiv.appendChild(option1);
    mainDiv.appendChild(option2);
    mainDiv.appendChild(option3);
    mainDiv.appendChild(option4);

    mainDiv.setAttribute("class", "main-container")
    body.appendChild(mainDiv);

    mainDiv.addEventListener("click", onDivClick);
};

let onDivClick = function (event) {
    let userInput = event.target.value;
    if (userInput === questions[questionCounter].answer) {
        revealedAnswer.textContent = "Right!"
        mainDiv.appendChild(revealedAnswer)
        setTimeout(function () {
            revealedAnswer.textContent = ""
            next()
        }, 1000)
    } else {
        initialTime -= 10;
        revealedAnswer.textContent = "Wrong!"
        mainDiv.appendChild(revealedAnswer)
        setTimeout(function () {
            revealedAnswer.textContent = ""
            next()
        }, 1000)
    }
}

// handles other questions
let next = function () {
    questionCounter++;
    if (questionCounter >= questions.length || initialTime <= 0) {
        endGame()
    } else {
        questionTitle.textContent = questions[questionCounter].question;
        option1.textContent = questions[questionCounter].option1;
        option1.value = questions[questionCounter].option1

        option2.textContent = questions[questionCounter].option2;
        option2.value = questions[questionCounter].option2;

        option3.textContent = questions[questionCounter].option3;
        option3.value = questions[questionCounter].option3;

        option4.textContent = questions[questionCounter].option4;
        option4.value = questions[questionCounter].option4;
    }
}

//highscore handler
let highscore = function () {
    timer.textContent = "";
    highscoreList.innerHTML = "";
    let storedScore = localStorage.getItem("highscore");
    const formatedStoredScores = JSON.parse(storedScore);

    scoreInput.removeAttribute("class", "main-container")
    scoreInput.classList.toggle("hide")

    highscoreContainer.setAttribute("class", "main-container");
    highscoreContainer.classList.toggle("hide");

    if (!formatedStoredScores) {
        window.alert("there are no highscores")
    } else if (highscoreList.querySelectorAll("li").length > 0) {
        return
    } else {
        for (let i = 0; i < formatedStoredScores.length; i++) {
            let listEl = document.createElement("li");
            listEl.textContent = (i + 1) + ": " + formatedStoredScores[i].initials + " - " + formatedStoredScores[i].score;
            highscoreList.appendChild(listEl)
        }
    }
};


let clearHighScores = function () {
    let confirmDelete = window.confirm("Are you sure you would like to erase highscores?");
    if (confirmDelete) {
        localStorage.clear();
        highscoreList.innerHTML = "";
    } else {
        window.alert("We did not clear your highscores")
    }
}

let endGame = function () {
    timer.textContent = initialTime;
    submitScore.removeEventListener("click", onSubmitClick);
    mainDiv.remove();
    scoreInput.classList.toggle("hide");
    scoreInput.setAttribute("class", "main-container")
    finalScore.textContent = "your final score is " + initialTime + "!";
    submitScore.addEventListener("click", onSubmitClick);
}

let onSubmitClick = function (event) {
    event.preventDefault();
    let storedScore = localStorage.getItem("highscore");
    let newScores = [];
    if (storedScore) {
        const formatedStoredScores = JSON.parse(storedScore);
        userStorage.initials = userInitial.value
        userStorage.score = initialTime
        newScores = [...formatedStoredScores, userStorage].sort((a, b) => b.score - a.score);
    } else {
        userStorage.initials = userInitial.value
        userStorage.score = initialTime
        newScores = [userStorage];
    }
    localStorage.setItem("highscore", JSON.stringify(newScores));
    highscore();
}

clearHighscores.addEventListener("click", clearHighScores)

highscoreButton.addEventListener("click", function () {
    timerSwitch = false;
    mainDiv.classList.remove("main-container");
    mainDiv.setAttribute("class", "hide");
    if (landingPage.classList.contains("main-container")) {
        landingPage.classList.remove("main-container")
        landingPage.classList.toggle("hide");
        highscore()
    } else {
        highscore();
    }
})

beginQuizButton.addEventListener("click", function () {
    landingPage.classList.remove("main-container")
    landingPage.classList.toggle("hide");
    startGame();
})

homeButton.addEventListener("click", function () {
    highscoreContainer.classList.remove("main-container");
    highscoreContainer.setAttribute("class", "hide");
    startGame()
})