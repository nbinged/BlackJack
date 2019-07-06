console.log("Hello script.js")
/////////////////////
//Global Variables://
/////////////////////

var allcards = [
{
rank: "ace",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-ace.png"
},

{
rank: "2",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-2.png"
},

{
rank: "3",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-3.png"
},

{
rank: "4",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-4.png"
},

{
rank: "5",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-5.png"
},

{
rank: "6",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-6.png"
},

{
rank: "7",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-7.png"
},

{
rank: "8",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-8.png"
},

{
rank: "9",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-9.png"
},

{
rank: "10",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-10.png"
},

{
rank: "jack",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-jack.png"
},

{
rank: "queen",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-queen.png"
},

{
rank: "king",
suit: "hearts",
cardImage: "images/Hearts-Suit/hearts-king.png"
}
];

// var cardSuits = ["spades", "hearts", "diamonds", "clubs"];
var cardValues = ["2", "3", "4", "5", "6", "7","8","9","10","J","Q","K","A"];
var randomCard = (Math.floor(Math.random() * cardValues.length));
var playersCards = [];
var sumOfPlayersCards = 0;

/////////////////////////////
//Upon loading the web-page//
/////////////////////////////

window.onload = function(){
    createBoard()
    console.log("Game board loaded")
};

/////////////////////
//Starting the game//
/////////////////////
var startGame = function(event) {
    var randomCard = "";
    hideStartBtn();
    showHitBtn();
    showStayBtn();
    showRestartBtn();

    for (var i = 0; i < 2; i++) {
    randomCard = (Math.floor(Math.random() * cardValues.length));

    playerCards.push(randomCard);
    }

    console.log("Player's card is "+playerCards[0]);
    console.log("Player's second card is "+playerCards[1]);
    console.log(playerCards);
}

// If player clicks the HIT ME button, the player gets another card.
var hitMe = function(event) {

    playerCards.push(Math.floor(Math.random() * cardValues.length));

console.log("Player has these cards"+playerCards);
console.log(playerCards);
}

// If the player would like to end the game
var stay = function(event) {

// To sum up the value of playerCards' array.
    for (let i = 0; i < playerCards.length; i++){
            sumOfPlayersCards = sumOfPlayersCards + playerCards[i];
        }

    if (sumOfPlayersCards < 21 || sumOfPlayersCards > 21) {
        console.log("You lose :(")
        }

    else if (sumOfPlayersCards === 21){
        console.log("YOU WON :)")
    }

    else {
        console.log("Bug here, fix it")
     }
}

var restart = function(event) {
}
/////////////////////
/// THINGS TO ADD ///
/////////////////////

// var checkWinState = function(){

//    if (sumOfPlayersCards === 21 || playersCards.length >= 5){
//     alert("YOU WON");
//    }

//    else if (sumOfPlayersCards < 21 || sumOfPlayersCards > 21)
//     alert("YOU LOSE :(");
// }

///////////////////////////////
///GAME BOARD BUTTON TOGGLES///
///////////////////////////////

var createBoard = function() {
for (var i = 0; i < 2; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute("src", "images/hearts/back.png");
    cardElement.setAttribute("data-id", i);
    document.getElementById("game-board").appendChild(cardElement);
    }
};

var hideStartBtn = function(){
    var startButton = document.querySelector('#btn-start');
    document.getElementById("btn-start").style.display = "none";
    console.log("hide 'START' button");
}

var showHitBtn = function(){
    var hitmeButton = document.querySelector('#btn-hit');
    document.getElementById("btn-hit").style.display = "block";
    console.log("show 'HIT' button");
}

var showStayBtn = function(){
      var startButton = document.querySelector('#btn-stay');
      document.getElementById("btn-stay").style.display = "block";
      console.log("show 'STAY' button");
}

var showRestartBtn = function(){
    var restartBtn  = document.querySelector('#btn-restart');
    document.getElementById("btn-restart").style.display = "block";
    console.log("show 'RESTART' button");
}
