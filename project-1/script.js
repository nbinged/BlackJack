console.log("Hello script.js")
//Global Variables:

//Deck of 52 cards. 4 suits, Spade, Clubs, Hearts and Diamonds. 13 of each.
var cardSuits = ["spades", "hearts", "diamonds", "clubs"];
var cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
var cardValues = ["2", "3", "4", "5", "6", "7","8","9","10","10","10","10","11"]; // Currently 1 suit =. 1 cards
var cardDeck = [];
var playerCards = [];
var sumOfPlayersCards = 0;
var index = playerCards

/////////////////////
//Starting the game//
/////////////////////

// // Show the Start button
// var showStartBtn = function(){
//   var startButton = document.querySelector('#start');
//   startButton.classList.remove('hidden');
//   console.log("show button");
// };

// // Hide the Start button
// var hideStartBtn = function(){
//   var startButton = document.querySelector('#start');
//   startButton.classList.add('hidden');
//   console.log("hide button");
// };

// When player clicks start game, 2 cards will appear. with "Stay" and "Hit Me button"
var randomCard = (Math.floor(Math.random() * cardValues.length));
// if (check duplicate cards) {}

var startGame = function(event) {
    var randomCard = "";
    // console.log("created board");
    // hideStartBtn();

    // var board = document.createElement('div');
    // board.className = 'board';

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

var winGame = function(){
}