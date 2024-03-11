function getHighscores() {
    // getting the scored from the localstorage or set to an empty array if non
    var highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];
  
    // this will sort the scores in decending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // creating li tag for each high score we have
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " -> " + score.score;
  
     
      var olEl = document.getElementById("highScore");
      olEl.appendChild(liTag); //display on the page
    });
  }
  
  function clearHighscores() 
  {
    window.localStorage.removeItem("highScores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;  // when the clear button is prssed call the clear highscore funtion
  
  // will run when the page is loaded
  getHighscores();