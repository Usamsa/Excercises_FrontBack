var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false; 
var level = 0;

$(document).keydown(function(){
    if (!gameStarted){
        nextSequence();
        gameStarted = true;
        $("h1").text("Level:" + level);
    }
})

function nextSequence() {
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random() * 4);
    level++;
    $("h1").text("Level:" + level);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


$(".btn").on("click", function(){ 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () { nextSequence(); }, 1000);

    }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour){
    $(("#" + currentColour)).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100); 
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
    
}
