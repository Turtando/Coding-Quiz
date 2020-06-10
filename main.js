// Global Variables
const startButton = document.getElementById("start-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question")
const answerButtonsEl = document.getElementById("answer-buttons")
// We need the questions to be constantly shuffled, 
// so they won't show up in the same order.

// define the next variables as Let will allow us to manipulate it later
let shuffledQuestions, currentQuestionIndex;


// Question Variables
const questions = [
    {
        question: "Commonly used Data types DO NOT include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: true},
            {text: "alerts", correct: false},
            {text: "numbers", correct: false}
        ]
    }

]

startButton.addEventListener("click", startGame);
// We need a function to prompt the start button into beginning the quiz
function startGame() {
    console.log("You started the game!");
    startButton.classList.add("hide");
    // set shuffled questions to the array
    shuffledQuestions = questions.sort(() => Math.random() -.5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
}
// This function will prompt the user to the next question event
function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
// we are using showQuestion to show the questions and answers instead of 
// "question, answer 1,2,3,4" - so we will append the new content
function showQuestion(question) {
    questionEl.innerText = question.question
    // We need to loop the questions
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        // adding a dataset attribute of correct for the right answers
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } else {
            prompt("That's the wrong answer!")
        }
        // add select button to events listener and add to button element
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
        })
}
// we must set a reset function so that we reset the content on the page from the initial quiz
function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {


}