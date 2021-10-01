let body = document.querySelector("body");
let landingPage = document.querySelector(".main-container")
let beginQuizButton = document.getElementById("begin-quiz")


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

beginQuizButton.addEventListener("click", function() {
    landingPage.classList.toggle("hide")
})

