//global variables
var randomNum = "";
var startNum = 0;
var wins = 0;
var losses = 0;
var crystalImg = ['assets/images/blue-diamond.jpeg', 'assets/images/green-diamond.jpeg', 'assets/images/pink-diamond.jpeg', 'assets/images/yellow-diamond.jpeg'];
var count = 13;

// Wrap every letter in a span
$('.crystal-head').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({loop: true})
    .add({
      targets: '.crystal-head .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: function(el, i) {
        return 70*i;
      }
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000
    });

document.onkeypress = function (event) {

    var enterKey = event.keyCode;

    if (enterKey === count) {
        count++;
        $(".key-start").remove();
        $(".crystal-head").remove();
        $(".rule-container").remove();
        startGame();
        console.log(count);

        $(".container-5").html('<div id= total-sum>' + "Your total score is: " + startNum + '</div>');

        $(".container-6").append('<div id= winner>' + "Wins: " + wins + '</div>');

        $(".container-6").append('<div id= loser>' + "Losses: " + losses + '</div>');
    } else if(count === 14) {
        count++;
        console.log(count);
        alert("Press Enter to Begin");
    }
    else{
        alert("Click on crystals!")
    }

}

function startGame() { //calls all the functions after a "enter" is pressed
    generateRandom();
    crystalValue();
    addNum();
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
        crystal.attr("height", "100");
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
    $(".container-5-6").html('<div id= result>' + "You Won!!!" +'</div>');

    resetGame();
}

function loserNum() {
    losses++;
    $("#loser").html("Losses: "+ losses);
    $(".container-5-6").html('<div id= result>' + "You Lost!!!" +'</div>');

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
