console.log("Hello script.js");

/////////////////////
//Global Variables://
/////////////////////
var deck = new Array();

// var randomCard = (Math.floor(Math.random() * Value.length));
var playersCards = [];
var sumOfPlayersCards = 0;

/////////////////////////////
//Upon loading the web-page//
/////////////////////////////

// window.onload = function(){
//     console.log("Game board loaded")

// };
var shuffle = function() {

    for (i = 0; i < 200; i++) {

        var cut1 = Math.floor((Math.random() * cards.length));
        var cut2 = Math.floor((Math.random() * cards.length));
        var temp = cards[cut1];

        cards[cut1] = cards[cut2];
        cards[cut2] = temp;
    }
    console.log(cards);
}
shuffle();


var renderDeck = function() {

    document.getElementById('deck').innerHTML = '';

    for (var i = 0; i < cards.length; i++)
    {
        var card = document.createElement("div");
        var cardImg  = document.createElement("img");
        card.className = "card";
        cardImg.src = cards[i].Cardimage;
        // var value = document.createElement("div");
        // var suit = document.createElement("div");
        // value.className = "value";
        // suit.className = "suit";

        // value.innerHTML= cards[i].Value;
        // suit.innerHTML = cards[i].Suit;
        // card.appendChild(value);
        // card.appendChild(suit);
        card.appendChild(cardImg);

        document.getElementById('deck').appendChild(card);
    }
};
renderDeck();


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
    randomCard = (Math.floor(Math.random() * cards.length));

    console.log("Player's card is "+playersCards[0]);
    console.log("Player's second card is "+playersCards[1]);
    console.log(playersCards);
    }
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

/////////////////////
/// THINGS TO ADD ///
/////////////////////

var checkWinState = function() {

   if (sumOfPlayersCards === 21 || (playersCards.length = 5 && sumOfPlayersCards < 21)) {
    alert("YOU WON")
    }

   else if (sumOfPlayersCards < 21 || sumOfPlayersCards > 21) {
    alert("YOU LOSE :(")
    }
};


var restart = function(event) {
};

///////////////////////////////
///GAME BOARD BUTTON TOGGLES///
///////////////////////////////

// var createBoard = function() {
// for (var i = 0; i < 2; i++) {
//     var cardElement = document.createElement('img');
//     cardElement.setAttribute("src", "images/&hearts;/back.png");
//     cardElement.setAttribute("data-id", i);
//     document.getElementById("game-board").appendChild(cardElement);
//     }
// };

var hideStartBtn = function(){
    var startButton = document.querySelector('#btn-start');
    document.getElementById("btn-start").style.display = "none";
    console.log("hide 'START' button");
};

var showHitBtn = function(){
    var hitmeButton = document.querySelector('#btn-hit');
    document.getElementById("btn-hit").style.display = "block";
    console.log("show 'HIT' button");
};

var showStayBtn = function(){
      var startButton = document.querySelector('#btn-stay');
      document.getElementById("btn-stay").style.display = "block";
      console.log("show 'STAY' button");
};

var showRestartBtn = function(){
    var restartBtn  = document.querySelector('#btn-restart');
    document.getElementById("btn-restart").style.display = "block";
    console.log("show 'RESTART' button");
}