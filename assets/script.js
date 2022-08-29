const question = document.getElementById("question");
// convert choices to array so we can do array functions //
const choice = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: "Inside what HTML element do you place the Javascript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1,
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice1: "The <body> section",
        choice2: "The <head> section",
        choice3: "Both the <head> and the <body> section",
        choice4: "Doesn't matter",
        answer: 3,
    
    },
    {
        question: "What tag defines a division or the beginning/end of an individual section in an HTML document?",
        choice1: "<div>",
        choice2: "<table>",
        choice3: "<img>",
        choice4: "<meta>",
        answer: 1,
    },
    {
        question: "What is a JavaScript element that represents either TRUE or FALSE values?",
        choice1: "condition",
        choice2: "event",
        choice3: "boolean",
        choice4: "regexp",
        answer: 3,
    },
    {
        question:"What is the type of loop that continues through a block of code as long as the specified condition remains TRUE?",
        choice1: "for loop",
        choice2: "conditional loop",
        choice3: "else loop",
        choice4: "while loop",
        answer: 1,
    }

]

var correctBonus = 10;
var MAX_QUESTIONS = 5;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

function getNewQuestion() {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //goes to end page//
        return window.location.assign("./end.html");
    }

    questionCounter++; //this increments it to 1 when we start the game//
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS; //shows how many questions left

    var questionIndex = Math.floor(Math.random() * availableQuestions.length); //gets a random number for a question//
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; //grabs html element and changes it to an actual question//

    choice.forEach(function (choice) {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number]; //gets right answer out of current question//
    });
    
    availableQuestions.splice(questionIndex, 1); //gets rid of question that was just used, prevents repeating

    acceptingAnswers = true;
};

    choice.forEach(function (choice) {
        choice.addEventListener('click', function (e) {
            if(!acceptingAnswers) return;
            acceptingAnswers = false;
            var selectedChoice = e.target;
            var selectedAnswer = selectedChoice.dataset["number"];

            var classToApply = 
                selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if(classToApply === 'correct') {
                incrementScore(correctBonus);
            }
            
            selectedChoice.parentElement.classList.add(classToApply);

          // makes sure that correct answers dont stay green when going to next question   
          setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          },1000);

         
            

        });
    });


function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}


startGame();