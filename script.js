const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionContainer = document.getElementById("question-container");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Management Language"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "Python"],
    answer: 1
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Django"],
    answer: 2
  }
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  nextBtn.classList.add("hidden");
  questionContainer.innerHTML = "";
  const currentQuestion = questions[currentQuestionIndex];
  const questionElement = document.createElement("h2");
  questionElement.textContent = currentQuestion.question;
  questionContainer.appendChild(questionElement);

  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.textContent = option;
    optionElement.classList.add("option");
    optionElement.addEventListener("click", () => selectAnswer(index));
    questionContainer.appendChild(optionElement);
  });
}

function selectAnswer(index) {
  const options = document.querySelectorAll(".option");
  const correctAnswer = questions[currentQuestionIndex].answer;
  options.forEach((option, i) => {
    option.classList.remove("correct", "wrong");
    if (i === correctAnswer) {
      option.classList.add("correct");
    }
    if (i === index && i !== correctAnswer) {
      option.classList.add("wrong");
    }
  });
  if (index === correctAnswer) score++;
  nextBtn.classList.remove("hidden");
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreDisplay.textContent = `${score} / ${questions.length}`;
}