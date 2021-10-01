let body = document.querySelector("body");
let landingPage = document.querySelector(".main-container")
let beginQuizButton = document.getElementById("begin-quiz")
let scoreInput = document.getElementById("score-input")
let userInitial = document.getElementById("user-initial")
let submitScore = document.getElementById("submit-score")
let finalScore = document.getElementById("final-score")
let timer = document.querySelector("h1");
let questionCounter = 0;
var initialTime = 60;

let mainDiv = document.createElement("div");
let questionTitle = document.createElement("h2");
let option1 = document.createElement("button");
let option2 = document.createElement("button");
let option3 = document.createElement("button");
let option4 = document.createElement("button");
let revealedAnswer = document.createElement("h3")

let userStorage = {
    initials: "",
    score: ""
}

let questions = [
    {
        question: "What is my favorite color?",
        option1: "red",
        option2: "green",
        option3: "blue",
        option4: "yellow",
        answer: "red"
    },
    {
        question: "What is my favorite band?",
        option1: "dance gavin dance",
        option2: "rise against",
        option3: "falling in reverse",
        option4: "a skylit drive",
        answer: "dance gavin dance"
    },
    {
        question: "What is my favorite food?",
        option1: "burritos",
        option2: "flan",
        option3: "chips and salsa",
        option4: "steak",
        answer: "chips and salsa"
    }
]

// let countdown = function () {
//     var timeInterval =  setInterval(function() {
//         if (initialTime > 0) {
//             timer.textContent = initialTime;
//             initialTime--;
//         } else {
//             clearInterval(timeInterval)
//         }
//     }, 1000)
// }

let startGame = function () {
//    countdown();


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

    mainDiv.addEventListener("click", function (event) {
        let userInput = event.target.value;
        if (userInput === questions[questionCounter].answer) {
            revealedAnswer.textContent = "Right!"
            mainDiv.appendChild(revealedAnswer)
            questionCounter++;
            next()
        } else {
            revealedAnswer.textContent = "Wrong!"
            mainDiv.appendChild(revealedAnswer)
            questionCounter++;
            next()
        }
    })
};


let next = function () {
    if (questionCounter >= questions.length) {
        console.log("The game has ended")
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

let endGame = function () {
    mainDiv.remove();
    scoreInput.classList.toggle("hide");
    scoreInput.setAttribute("class", "main-container")

    finalScore.textContent = "your final score is " + questionCounter + "!";

    submitScore.addEventListener("click", function (event) {
        event.preventDefault();
        userStorage.score = questionCounter;
        userStorage.initials = userInitial.value;
        
        localStorage.setItem("highscore", JSON.stringify(userStorage));
        highscore();
    })
}

let highscore = function () {
    scoreInput.removeAttribute("class", "main-container")
    scoreInput.classList.toggle("hide")

    
};

beginQuizButton.addEventListener("click", function () {
    landingPage.classList.remove("main-container")
    landingPage.classList.toggle("hide");
    startGame();
})

