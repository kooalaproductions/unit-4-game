var randomNum = "";
var startNum = 0;
var wins = 0;
var losses = 0;
var crystalImg = ['assets/images/blue-diamond.jpeg', 'assets/images/green-diamond.jpeg', 'assets/images/pink-diamond.jpeg', 'assets/images/yellow-diamond.jpeg'];
var count = 13;


document.onkeypress = function (event) {

    var enterKey = event.keyCode;

    if (enterKey === count) {
        count++;
        $(".key-start").remove();
        $(".crystal-head").remove();
        startGame();

        $(".container-5").html('<div id= total-sum>' + "Your total score is: " + startNum + '</div>');

        $(".container-6").append('<div id= winner>' + "Wins: " + wins + '</div>');

        $(".container-6").append('<div id= loser>' + "Losses: " + losses + '</div>');
    } else {
        alert("Press Enter to Begin");
    }

}


function startGame() { //calls all the functions after a "enter" is pressed


    rules();
    generateRandom();
    crystalValue();
    addNum();
    


}

function rules() { //prints out the rules
    $(".rule-container").append("You will be given a random number at the start of the game." + "<br>" +
        "There are four crystals below. By clicking on a crystal you will add a specific amount of points to your total score." + "<br>" +
        "You win the game by matching your total score to random numbe, you lose the game if your total score goes above the random number" + "<br>" +
        "The value of each crystal is hidden from you until you click on it. " + "<br>" +
        "Each time when the game starts, the game will change the values" + "<br>");

}


function generateRandom() { //creates random number the user has to match
    randomNum = Math.floor(Math.random() * 102) + 19;
    $(".container-4").html('<div id= random-number>' + randomNum + '</div>');

    console.log("random: " + randomNum);
}

function crystalValue() {
    for (var i = 0; i < crystalImg.length; i++) {
        var crystal = $("<img>");
        crystal.addClass("crystal-" + i, "col-lg-12");
        crystal.addClass("col-lg-12");
        crystal.attr("src", crystalImg[i]);
        crystal.attr("height", "50");
        crystal.attr("value", (Math.floor(Math.random() * 12) + 1));
        $(".cards").append(crystal);
    }
    
}

function addNum() { //adds the value when crystals are clicked
    var valueNum = 0;
    $('.cards img').click(function () {
        // alert($(this).attr('value'));
        valueNum = parseInt($(this).attr('value'));

        startNum = startNum + valueNum; //adding each number from the crystal
        if (startNum > randomNum) {
            loserNum();
        }
        if (startNum === randomNum) {
            winnerNum();
        }



        $(".container-5").html('<div id= total-sum>' + "Your total score is: " + startNum + '</div>');

        //   $("#total-sum").html("this is the sum:" +startNum);
        console.log("this is the total number for user: " + startNum)

    });


}

function winnerNum() {
    wins++;
    $("#winner").html("Wins: "+ wins);
    // $(".container-6").html('<div id= winner>' + "Wins: " + wins + '</div>');

    resetGame();
}

function loserNum() {
    losses++;
    $("#loser").html("Losses: "+ losses);
    // $(".container-6").html('<div id= loser>' + "Losses: " + losses + '</div>');

    resetGame();

}


function resetGame() { //resets the game
    randomNum = Math.floor(Math.random() * 102) + 19;
    $(".container-4").html('<div id= random-number>' + randomNum + '</div>');
    for(var i = 0; i< 4;i++){
        $(".crystal-"+i).empty();
        $(".crystal-"+i).attr("value", (Math.floor(Math.random() * 12) + 1));
    }
  startNum = 0;
    $(".container-5").html('<div id= total-sum>' + "Your total score is: " + startNum + '</div>');


}
