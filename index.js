const questionBank = {
  os: [
      {
          question: "Which of the following is not an operating system?",
          options: ["Windows", "Linux", "Oracle", "MacOS"],
          answer: "Oracle"
      },
      {
          question: "What is a process?",
          options: ["A program in execution", "A compiler", "A link loader", "A device driver"],
          answer: "A program in execution"
      },
      {
          question: "Which scheduling algorithm is preemptive?",
          options: ["FCFS", "SJF", "SRTF", "FIFO"],
          answer: "SRTF"
      },
      {
          question: "Thrashing is related to?",
          options: ["CPU", "Cache", "Memory", "Disk I/O"],
          answer: "Memory"
      },
      {
          question: "Which one is not a valid state of a process?",
          options: ["Ready", "Running", "Blocked", "Destroyed"],
          answer: "Destroyed"
      }
  ],

  cd: [
      {
          question: "Which phase of compiler converts source code to tokens?",
          options: ["Lexical Analysis", "Syntax Analysis", "Semantic Analysis", "Code Generation"],
          answer: "Lexical Analysis"
      },
      {
          question: "Which data structure is used by recursive descent parser?",
          options: ["Stack", "Queue", "Tree", "Linked List"],
          answer: "Stack"
      },
      {
          question: "Which of these is a bottom-up parser?",
          options: ["LL Parser", "LR Parser", "Predictive Parser", "Recursive Descent Parser"],
          answer: "LR Parser"
      },
      {
          question: "Intermediate code is generated in which phase?",
          options: ["Lexical Analysis", "Optimization", "Syntax Analysis", "Semantic Analysis"],
          answer: "Semantic Analysis"
      },
      {
          question: "What is a left recursion?",
          options: ["A grammar rule where non-terminal calls itself on left", "A grammar with multiple terminals", "A grammar with no terminals", "None"],
          answer: "A grammar rule where non-terminal calls itself on left"
      }
  ],

  webtech: [
      {
          question: "Which language runs in the browser?",
          options: ["Java", "C", "Python", "JavaScript"],
          answer: "JavaScript"
      },
      {
          question: "HTML is used for?",
          options: ["Styling", "Structuring", "Programming", "Database"],
          answer: "Structuring"
      },
      {
          question: "CSS stands for?",
          options: ["Cascading Style Sheets", "Creative Style Syntax", "Computer System Sheets", "Color Style Syntax"],
          answer: "Cascading Style Sheets"
      },
      {
          question: "Which HTML tag is used for images?",
          options: ["<image>", "<pic>", "<img>", "<src>"],
          answer: "<img>"
      },
      {
          question: "Which HTTP method is used to send data?",
          options: ["GET", "POST", "PUT", "HEAD"],
          answer: "POST"
      }
  ],

  python: [
      {
          question: "Which is used to define a function in Python?",
          options: ["function", "fun", "def", "define"],
          answer: "def"
      },
      {
          question: "What is the output of print(2**3)?",
          options: ["6", "8", "9", "12"],
          answer: "8"
      },
      {
          question: "Which of the following is immutable?",
          options: ["List", "Dictionary", "Tuple", "Set"],
          answer: "Tuple"
      },
      {
          question: "What does len() do?",
          options: ["Adds numbers", "Prints output", "Returns length", "Deletes variable"],
          answer: "Returns length"
      },
      {
          question: "Which keyword is used for loop in Python?",
          options: ["repeat", "foreach", "loop", "for"],
          answer: "for"
      }
  ]
};

let currquestion = 0;
let score = 0;
let timer;
let timeleft = 30;
let selectedans = [];

const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-button");
const usernameInput = document.getElementById("username");
const subjectScreen = document.getElementById("subject-screen");
const subjectButtons = document.querySelectorAll(".subject-btn");


const quizContainer = document.getElementById("quiz-container");  
const questionNav = document.getElementById("question-nav");
const bigTime = document.getElementById("big-time");
const submitBtn = document.getElementById("submit-btn"); 
const questioncontainer = document.getElementById("question");
const optionscontainer = document.getElementById("options");
const nextbutton = document.getElementById("next-button");

const resultbox = document.getElementById("result-box");
const scoredisplay = document.getElementById("score");
const reviewcontainer = document.getElementById("review");
const restartbutton = document.getElementById("restart-button");
const progressdisplay = document.getElementById("progress");
const timedisplay = document.getElementById("time");
const resultTitle = document.getElementById("result-title");
const progressBar=document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let username = "";
let selectedSubject = "";

startButton.addEventListener("click", () => {
  username = usernameInput.value.trim();

  if (username === "") {
      alert("please enter your name");
      return;
  }

  localStorage.setItem("quizUsername", username);

  welcomeScreen.classList.add("hidden");
  subjectScreen.classList.remove("hidden");     
});

subjectButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    selectedSubject=btn.dataset.subject;
    questions=questionBank[selectedSubject];
    generateQuestionNav();
    subjectScreen.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startquiz();
  })
})
submitBtn.addEventListener("click", () => {
  clearInterval(timer);
  showresults();
});

function generateQuestionNav(){
  questionNav.innerHTML="";
  questions.forEach((_,i)=>{
    const btn=document.createElement("button");
    btn.textContent=i+1;
    btn.classList.add("q-btn");

    btn.addEventListener("click",()=>{
      currquestion=i;
      showQuestion();
      updateQuestionNav();
    });
    questionNav.appendChild(btn);
  });

}


function startquiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = questions[currquestion];
  questioncontainer.textContent = q.question;
  optionscontainer.innerHTML = "";
  progressdisplay.textContent = `Question ${currquestion + 1} of ${questions.length}`;

  let progressPercent = Math.floor((currquestion / questions.length) * 100);
  progressBar.style.width = progressPercent + "%";
  progressText.textContent = progressPercent + "%";

  
  q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.addEventListener("click", () => selectAnswer(opt));
      optionscontainer.appendChild(btn);
  });
}

function selectAnswer(answer) {
  selectedans[currquestion] = answer;
  const q = questions[currquestion];

  if (answer === q.answer) score++;

  Array.from(optionscontainer.children).forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === q.answer) {
          btn.classList.add("correct");
      } else if (btn.textContent === answer) {
          btn.classList.add("incorrect");
      }
  });
}
function updateQuestionNav(){
  const btns = document.querySelectorAll(".q-btn");
  btns.forEach((btn, i) => {
    btn.classList.remove("q-active");

    if (selectedans[i]) {
        btn.classList.add("q-complete");
    }

    if (i === currquestion) {
        btn.classList.add("q-active");
    }
});
}

function startTimer() {
  timer = setInterval(() => {
      timeleft--;
      timedisplay.textContent = timeleft;
      bigTime.textContent = timeleft + "s";

      if (timeleft <= 0) {
          clearInterval(timer);
          showresults();
      }
  }, 1000);
}

nextbutton.addEventListener("click", () => {
  if (currquestion < questions.length - 1) {
      currquestion++;
      showQuestion();
  } else {
      clearInterval(timer);
      showresults();
  }
});

function showresults() {
    document.getElementById("side-panel").classList.add("hidden");
  
  document.getElementById("quiz-box").classList.add("hidden");
  resultbox.classList.remove("hidden");
  progressBar.style.width = "100%";
  progressText.textContent = "100%";

  const savedName = localStorage.getItem("quizUsername");   
  resultTitle.textContent = `${savedName}, here are your results:`;  

  scoredisplay.textContent = `You scored ${score} out of ${questions.length}`;

  reviewcontainer.innerHTML = "<h3>Answer Review:</h3>";

  questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>Q${i + 1}:</strong> ${q.question}</p>
        <p>Your Answer: ${selectedans[i] || "Not Answered"}</p>
        <p>Correct Answer: ${q.answer}</p>
        <hr>
      `;
      reviewcontainer.appendChild(div);
  });
  const ctx = document.getElementById("pieChart").getContext("2d");
  new Chart(ctx, {
      type: "pie",
      data: {
          labels: ["Correct", "Incorrect"],
          datasets: [{
              data: [score, questions.length - score],
              backgroundColor: ["#4caf50", "#f44336"],
          }]
      },
      options: { plugins: { legend: { position: "bottom" } } }
  });

 
  const barCtx = document.getElementById("barChart").getContext("2d");
  const labels = questions.map((_, i) => `Q${i + 1}`);
  const data = questions.map((q, i) => selectedans[i] === q.answer ? 1 : 0);

  new Chart(barCtx, {
      type: "bar",
      data: {
          labels,
          datasets: [{
              label: "Accuracy",
              data,
              backgroundColor: data.map(v => v ? "#4caf50" : "#f44336")
          }]
      },
      options: {
          scales: {
              y: { beginAtZero: true, max: 1 }
          }
      }
  });
}

restartbutton.addEventListener("click", () => {
  location.reload();
});
