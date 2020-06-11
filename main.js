// Global Variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
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
    },
    {
        question: "Commonly used Data types DO NOT include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: true},
            {text: "alerts", correct: false},
            {text: "numbers", correct: false}
        ]
    },
    {
        question: "Commonly used Data types DO NOT include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: true},
            {text: "alerts", correct: false},
            {text: "numbers", correct: false}
        ]
    },
    {
        question: "Commonly used Data types DO NOT include:",
        answers: [
            {text: "strings", correct: false},
            {text: "booleans", correct: true},
            {text: "alerts", correct: false},
            {text: "numbers", correct: false}
        ]
    },

]
// Our start and next event listeners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

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
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
// we are using showQuestion to show the questions and answers instead of 
// "question, answer 1,2,3,4" - so we will append the new content
function showQuestion(question) {
    questionEl.innerText = question.question
    // We need to loop the questions using forEach
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        // adding a dataset attribute of correct for the right answers
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        // else {
        //     alert("That's the wrong answer!")
        // }
        
        // add select button to events listener and add to button element
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
        console.log(button)
        })
}
// we must set a reset function so that we reset the content on the quiz for the initial quiz
function resetState() {
    nextButton.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

// this function is how we will determine if the answer is correct
// because we used a dataset to check if true, we can set our correct variable to ".correct"
function selectAnswer(i) {
    var selectedButton = i.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)

    // loop through our other buttons using forEach
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    // then show our Next button- if we are on the last question of the quiz, it will prompt its reset
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
    nextButton.classList.remove("hide")
}

// if the correct answer is selected, this will add the element of correct prompting the next function
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
// we are then clearing the status of the classes
function clearStatusClass(element) {
        element.classList.remove("correct")
        element.classList.remove("wrong")
    }

}