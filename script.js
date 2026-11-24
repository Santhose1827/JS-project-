
// ========================================
// 1. QUESTIONS ARRAY
// ========================================

const questions = [
    {
        question: "Which language is used to create web page interactivity?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: "JavaScript"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "int",
            "var",
            "string",
            "define"
        ],
        answer: "var"
    },
    {
        question: "Which method is used to print output in the console?",
        options: [
            "console.log()",
            "print()",
            "display()",
            "write()"
        ],
        answer: "console.log()"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "<!-- -->",
            "##",
            "//",
            "**"
        ],
        answer: "//"
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: [
            "pop()",
            "push()",
            "shift()",
            "slice()"
        ],
        answer: "push()"
    },
    {
        question: "Which keyword declares a block-scoped variable?",
        options: [
            "var",
            "let",
            "print",
            "function"
        ],
        answer: "let"
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Data Object Model",
            "Document Object Model",
            "Digital Output Method",
            "Document Oriented Method"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which operator is used for strict equality?",
        options: [
            "==",
            "=",
            "===",
            "!="
        ],
        answer: "==="
    }
];


// ========================================
// 2. VARIABLES
// ========================================

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;


// ========================================
// 3. DOM ELEMENTS
// ========================================

const questionText = document.getElementById("question-text");

const optionsContainer = document.getElementById("options-container");

const questionNumber = document.getElementById("question-number");

const scoreDisplay = document.getElementById("score");

const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("next-btn");

const quizScreen = document.getElementById("quiz-screen");

const resultScreen = document.getElementById("result-screen");

const finalScore = document.getElementById("final-score");

const restartButton = document.getElementById("restart-btn");


// ========================================
// 4. DISPLAY CURRENT QUESTION
// ========================================

function displayQuestion() {

    // Get the current question object
    const currentQuestion = questions[currentQuestionIndex];

    // Reset answer selection
    answerSelected = false;

    // Display question number
    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Display score
    scoreDisplay.textContent = `Score: ${score}`;

    // Display question dynamically
    questionText.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Clear previous feedback
    feedback.textContent = "";

    // Hide Next Question button
    nextButton.hidden = true;

    // Dynamically create four option buttons
    currentQuestion.options.forEach((option) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option-btn");

        // Add click event to each option
        button.addEventListener("click", function () {

            checkAnswer(button, option);

        });

        // Add button to options container
        optionsContainer.appendChild(button);

    });

}


// ========================================
// 5. CHECK ANSWER
// ========================================

function checkAnswer(selectedButton, selectedOption) {

    // Prevent multiple selections
    if (answerSelected) {
        return;
    }

    answerSelected = true;

    const currentQuestion = questions[currentQuestionIndex];

    const correctAnswer = currentQuestion.answer;

    // Get all option buttons
    const allButtons =
        optionsContainer.querySelectorAll(".option-btn");

    // Disable all buttons after selection
    allButtons.forEach((button) => {
        button.disabled = true;
    });

    // Check whether the selected answer is correct
    if (selectedOption === correctAnswer) {

        // Highlight correct answer in green
        selectedButton.classList.add("correct");

        // Increase score
        score++;

        // Display success message
        feedback.textContent = "Correct Answer! Well Done.";

        feedback.style.color = "green";

    } else {

        // Highlight selected wrong answer in red
        selectedButton.classList.add("wrong");

        // Display correct answer
        feedback.textContent =
            `Wrong Answer! Correct Answer: ${correctAnswer}`;

        feedback.style.color = "red";

        // Highlight correct option in green
        allButtons.forEach((button) => {

            if (button.textContent === correctAnswer) {

                button.classList.add("correct");

            }

        });

    }

    // Update score display
    scoreDisplay.textContent = `Score: ${score}`;

    // Show Next Question button
    nextButton.hidden = false;

}


// ========================================
// 6. NEXT QUESTION
// ========================================

nextButton.addEventListener("click", function () {

    // Move to the next question
    currentQuestionIndex++;

    // Check whether all questions are completed
    if (currentQuestionIndex < questions.length) {

        displayQuestion();

    } else {

        showFinalResult();

    }

});


// ========================================
// 7. FINAL SCORE SCREEN
// ========================================

function showFinalResult() {

    // Hide quiz screen
    quizScreen.hidden = true;

    // Show result screen
    resultScreen.hidden = false;

    // Generate feedback based on score
    let feedbackMessage;

    if (score === 8) {

        feedbackMessage = "Excellent! Perfect Score!";

    } else if (score >= 6) {

        feedbackMessage = "Great Job! You have good knowledge.";

    } else if (score >= 4) {

        feedbackMessage = "Good Effort! Keep Practicing.";

    } else {

        feedbackMessage = "Keep Learning! You can do better.";

    }

    // Display final score and feedback
    finalScore.textContent =
        `You scored ${score} out of ${questions.length} — ${feedbackMessage}`;

}


// ========================================
// 8. RESTART QUIZ
// ========================================

restartButton.addEventListener("click", function () {

    // Reset question index
    currentQuestionIndex = 0;

    // Reset score
    score = 0;

    // Reset answer selection
    answerSelected = false;

    // Hide result screen
    resultScreen.hidden = true;

    // Show quiz screen
    quizScreen.hidden = false;

    // Start from the first question
    displayQuestion();

});


// ========================================
// 9. START THE QUIZ
// ========================================

displayQuestion();
