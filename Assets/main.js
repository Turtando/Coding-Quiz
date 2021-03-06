// Global Variables
const startButton = document.getElementById("start-btn");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const submitEl = document.getElementById("submit-score")
const highScores = JSON.parse(localStorage.getItem("highScores"))
var answerResponse = document.getElementById("answer-response");
var countdownEl = document.getElementById("countdown");
let countRightAnswers = 0;
const startingMinutes = 2;
let time = startingMinutes * 60;
var stopwatch;
document.getElementById("right-answers").innerHTML = countRightAnswers;
// We need the questions to be constantly shuffled, 
// so they won't show up in the same order.

// define the next variables as Let will allow us to manipulate it later
let shuffledQuestions, currentQuestionIndex;


// Question Variables
const questions = [
    {
        question: "Commonly used Data types DO NOT include:",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: true },
            { text: "alerts", correct: false },
            { text: "integers", correct: false }
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed within ____",
        answers: [
            { text: "quotes", correct: false },
            { text: "parentheses", correct: false },
            { text: "curly brackets", correct: true },
            { text: "square brackets", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "javaScript", correct: false },
            { text: "terminal/bash", correct: false },
            { text: "for loops", correct: false },
            { text: "console.log", correct: true }
        ]
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false }
        ]
    }

]
// Our start and next event listeners
startButton.addEventListener("click", startGame);



// We need a function to prompt the start button into beginning the quiz
// This function also begins the games Score counter at 0.
function startGame() {
    console.log("You started the game!");
    stopwatch = setInterval (function(){
        if ( time >= 0 ){
            countdownEl.innerHTML = time;
        time--;
        }    
        else {
            clearInterval(stopwatch)
            countdownEl.innerHTML = "GAME OVER!"
            questionContainerEl.classList.add("hide")
            submitEl.classList.remove("hide")
        }
    }, 1000);

    startButton.classList.add("hide");
    // set shuffled questions to the array
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    countRightAnswers = 0;
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
      
        // add select button to events listener and add to button element
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
        console.log(button)
    })
}
// we must set a reset function so that we reset the content on the quiz for the initial quiz
function resetState() {

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


    if (correct) {
        answerResponse.innerHTML = "That is correct!"
    } else {
        answerResponse.innerHTML = "That is wrong!"
    }

    // loop through our other buttons using forEach
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    // then show our Next button- if we are on the last question of the quiz, it will prompt its reset
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++
        setNextQuestion()
    }
    else {
        questionContainerEl.classList.add("hide")
        submitEl.classList.remove("hide")
        clearInterval(stopwatch)
    } 
    if (selectedButton.dataset = correct) {
        countRightAnswers++;
    }
    else {
        time -= 20;
        
    }
    document.getElementById('right-answers').innerHTML = countRightAnswers;
}

// submit button function

function submitScore() {
    var username = document.getElementById("fname").value
    // countRightAnswers.value
    localStorage.setItem(username, time);
    // window.location.replace(href ="./highscores.html")
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






