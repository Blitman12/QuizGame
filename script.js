let body = document.querySelector("body");
let landingPage = document.querySelector(".main-container")
let beginQuizButton = document.getElementById("begin-quiz")
let questionCounter = 0;

let mainDiv = document.createElement("div");
let questionTitle = document.createElement("h2");
let option1 = document.createElement("button");
let option2 = document.createElement("button");
let option3 = document.createElement("button");
let option4 = document.createElement("button");
let revealedAnswer = document.createElement("h3")

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

let startGame = function () {
    questionTitle.textContent = questions[0].question;
    option1.textContent = questions[0].option1;
    option1.setAttribute("value", questions[0].option1)
    option2.textContent = questions[0].option2;
    option2.setAttribute("value", questions[0].option2)
    option3.textContent = questions[0].option3;
    option3.setAttribute("value", questions[0].option3)
    option4.textContent = questions[0].option4;
    option4.setAttribute("value", questions[0].option4)

    mainDiv.appendChild(questionTitle);
    mainDiv.appendChild(option1);
    mainDiv.appendChild(option2);
    mainDiv.appendChild(option3);
    mainDiv.appendChild(option4);
    console.log(option1)

    mainDiv.setAttribute("class", "main-container")
    body.appendChild(mainDiv);

    mainDiv.addEventListener("click", function (event) {
        let userInput = event.target.value;
        if (userInput === questions[0].answer) {
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
    questionTitle.textContent = questions[questionCounter].question;
    option1.textContent = questions[questionCounter].option1;
    option1.value = questions[questionCounter].option1
    // option1.setAttribute("value", questions[questionCounter].option1)
    option2.textContent = questions[questionCounter].option2;
    option2.value = questions[questionCounter].option2;
    // option2.setAttribute("value", questions[questionCounter].option2)
    option3.textContent = questions[questionCounter].option3;
    option3.value = questions[questionCounter].option3;
    // option3.setAttribute("value", questions[questionCounter].option3)
    option4.textContent = questions[questionCounter].option4;
    option4.value = questions[questionCounter].option4;
    // option4.setAttribute("value", questions[questionCounter].option4)

    console.log(option1)
    mainDiv.addEventListener("click", function (event) {
        let userInput = event.target.value;
        console.log(userInput + " user input")
        console.log(questions[questionCounter].answer)
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
}


beginQuizButton.addEventListener("click", function() {
    landingPage.classList.remove("main-container")
    landingPage.classList.toggle("hide");
    startGame();
})

