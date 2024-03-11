var questions = [
{   title: "What is Js",
    choice: ["C++", "Python", "Java", "JavaScript"],
    answer: "JavaScript" 
} ,
{   title: "What is html?",
    choice: ["C++", "Visual Stidio", "Hypertext Markup Language", "Cascading Style Sheets"],
    answer: "Hypertext Markup Language" 
} ,

{   title: "What is css?",
    choice: ["Java", "California", "Hypertext Markup Language", "Cascading Style Sheets"],
    answer: "Cascading Style Sheets" 
} ,
{   title: "Which one is a looping structure in JavaScript?",
    choice: ["All the below", "For", "While", "do-while loops"],
    answer: "All the below" 
} ,

]


var questionsEl = document.getElementById("questions");
var choiceEl = document.getElementById("choices")
var questionIndex = 0;
var startButton = document.getElementById("button");
var submitButton = document.getElementById("submit")
var timerEl = document.getElementById("time");
var feedbackEl = document.getElementById("feedBack");
var initialsEl = document.getElementById("initials");




var timer;
var time = questions.length * 20; // 20 sec for each question is given. 



//functions runs when the users clicks the start button
function startQuiz()
{
 
  startButton.style.visibility = 'hidden'; //Hidding the start button when clicked


  timer = setInterval(clock, 1000); //starting the timer
  timerEl.textContent = time;


  displayQuestion();
}


function clock()
{

   // update time
   time--;
   timerEl.textContent = time;
 
   // check if user ran out of time
   //if (time <= 0) {
   //  quizEnd();
  // }
 }



function displayQuestion()
{
    var currentQuestion = questions[questionIndex]

    //display the question
    questionsTitle.textContent = currentQuestion.title;


     // clear out any old question choices
    choiceEl.innerHTML = "";

    // loop over choices
    currentQuestion.choice.forEach(function(choice, i) 
    {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice; //seting the choices numbers

    // adding event listener to each choice buttons and calling the function when a button is clicked
    choiceNode.onclick = choiceClicked;

    // display on the page
    choiceEl.appendChild(choiceNode);
  });
    
    console.log(questions[0].choice[0])
}


function choiceClicked()
{
  // check if user guessed wrong
  if (this.value !== questions[questionIndex].answer)
  {
    // penalize time
    time -= 15;

    if (time < 0)
    {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    //display wrong
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "400%";
  }
  else
  {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "400%";

  }



  // flash right/wrong feedback
  //feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() { feedbackEl.style.visibility = 'hidden';; }, 1000);
  feedbackEl.style.visibility = 'visible'

  // next question
  questionIndex++;

  // time checker
  if (questionIndex === questions.length)
  {
    quizEnd();
  } 
  else {
    displayQuestion();
  }

}

function quizEnd()
{
  //stop the timer
  clearInterval(timer);
  choiceEl.style.visibility = 'hidden'; //hide the choices
  questionsTitle.textContent = "QUIZ ENDED";
  var endScreen = document.getElementById("endScreen");
  endScreen.style.visibility = 'visible';
  var finalScoreEl = document.getElementById("finalScore");
  finalScoreEl.textContent = "Final Score: " + time;

}

function saveHighscore() {
  // get value from the input box
  var initials = initialsEl.value.trim();
  console.log("submit clicked")

  if (initials !== "") {

    var highscores = JSON.parse(window.localStorage.getItem("highScores")) || []; //saving the high score if there is one if not then its stays empty array

    // var with formated new score object
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highScores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "./scores.html";
  }
}



//Calling the startQuick functions when the user clicks starts
startButton.addEventListener("click", startQuiz);

// submit initials when the submit button is clicked 
submitButton.onclick = saveHighscore;