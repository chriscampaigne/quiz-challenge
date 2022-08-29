var username = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener("input" , function () {
   
    saveScoreBtn.disabled = !username.value;

});

console.log(username.value)


function saveHighScore (e) {
    console.log("clicked save button");
    e.preventDefault(); //prevents going to new page

}