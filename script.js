//////////////////////////////////////////
//Import the deck of cards from cards.js//
//////////////////////////////////////////
import {deck} from cards.js

/////////////////////
//Global Variables://
/////////////////////
var player = {cards: [], score: 0, money: 100, bet: 0}
var dealer = {cards: [], score: 0}
var numCardsPulled = 0;

/////////////////////
//Starting the game//
/////////////////////
var startGame = function(event) {
    hideStartBtn();
    showHitBtn();
    showStandBtn();
    showSurrenderBtn();
    shuffle();
    playerCards();
    playerCards();
    dealerCards();
    dealerCover();
    putPlayerUI();
    hideBettingBtn();
    showPlayerBet();
}

///////////////////////
//Card Deck Functions//
///////////////////////

//Shuffles deck at the start of the game.
var shuffle = function() {

    for (i = 0; i < 2000; i++) {

        var cut1 = Math.floor((Math.random() * deck.length));
        var cut2 = Math.floor((Math.random() * deck.length));
        var temp = deck[cut1];

        deck[cut1] = deck[cut2];
        deck[cut2] = temp;
    }
//     console.log(deck);
};

////////////////////
///Game Functions///
////////////////////

var playerScoreCheck = function() {
// To sum up the value of playerCards' array.
    var aceCount = 0;
    player.score = 0;

    for (i = 0; i < player.cards.length; i++) {

//         console.log("Value of "+i);
        if (player.cards[i].Value === "J" || player.cards[i].Value === "Q" || player.cards[i].Value === "K") {

            player.score += 10;
//             console.log("Added picture-card. Player's current score: "+player.score)
        }

        else if (player.cards[i].Value === "A") {

            player.score += 11;
            aceCount += 1;
//             console.log("Added Ace-card. Player's current score: "+player.score)
        }

        else {
            player.score += (parseInt(player.cards[i].Value));
//             console.log("Added another card. Player's current score: "+player.score)
        }
}

    if (aceCount > 0 && (player.score > 21)) {
            player.score -=10;
            aceCount -= 1;
//         console.log("Ace taken as '1'. Player's current score is "+player.score);
//         console.log(aceCount)
        }

    if (player.score > 21) {
        checkWin();
    }

    document.getElementById('points').innerHTML = "Player's points: "+player.score;;
};

var dealerScoreCheck = function() {
// To sum up the value of playerCards' array.
    var aceCount = 0;
    dealer.score = 0;

    for (i = 0; i < dealer.cards.length; i++) {

        if (dealer.cards[i].Value === "J" || dealer.cards[i].Value === "Q" || dealer.cards[i].Value === "K") {

            dealer.score += 10;
//             console.log("Added picture-card. Dealer's current score: "+dealer.score)
        }

        else if (dealer.cards[i].Value === "A") {

            dealer.score += 11;
            aceCount += 1;
//             console.log("Added Ace-card. Dealer's current score: "+dealer.score)
        }

        else {
            dealer.score += (parseInt(dealer.cards[i].Value));
//             console.log("Added another card. Dealer's current score: "+dealer.score)
        }
    };

    if (aceCount > 0 && (dealer.score > 21)) {
            dealer.score -=10;
            aceCount -= 1;
//         console.log("Ace taken as '1'. Dealer's score is "+dealer.score);
//         console.log(aceCount)
    }
}

//DealCards, give player their starting 2 cards.
var playerCards = function() {

    player.cards.push(deck[numCardsPulled]);

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        //Player's Hand:
//         console.log("Player received card:")
//         console.log(deck[numCardsPulled]);
//         console.log(numCardsPulled);

        cardDiv.className = "cardDiv";
        cardImg.src = player.cards[numCardsPulled].Cardimage;

        cardDiv.appendChild(cardImg);
        document.getElementById('players-cards-div').appendChild(cardDiv);

        playerScoreCheck();
        numCardsPulled += 1;
}

var dealerCards = function() {

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        var dealtCard = deck.pop();
        dealer.cards.push(dealtCard);

//         console.log("Dealer received card:")
//         console.log(dealtCard);

        cardDiv.className = "cardDiv";
        cardImg.src = dealtCard.Cardimage;

        cardDiv.appendChild(cardImg);
        document.getElementById('dealers-cards-div').appendChild(cardDiv);

        dealerScoreCheck();
}

var dealerCover = function() {

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        var dealtCard = deck.pop();
        dealer.cards.push(dealtCard);

//         console.log("Dealer received card:")
//         console.log(dealtCard);

        cardDiv.className = "cardDiv";
        cardImg.id ="cover";
        cardImg.src = "images/back.png";

        cardDiv.appendChild(cardImg);
        document.getElementById('dealers-cards-div').appendChild(cardDiv);

        dealerScoreCheck();
}

// HitMe, Adds an extra card to the player's array.
var hitMe = function(event) {

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        var dealtCard = deck.pop();
        player.cards.push(dealtCard);

        cardDiv.className = "cardDiv";
        cardImg.src = player.cards[player.cards.length-1].Cardimage;

        cardDiv.appendChild(cardImg);
        document.getElementById('players-cards-div').appendChild(cardDiv);

        playerScoreCheck();
};

var hitDealer = function() {

    var cardDiv = document.createElement("div");
    var cardImg  = document.createElement("img");

       //for (var x = 0; x < player.cards.length; x++)

        var dealtCard = deck.pop();
        dealer.cards.push(dealtCard);

        cardDiv.className = "cardDiv";
        cardImg.src = dealer.cards[dealer.cards.length-1].Cardimage;
        //Hidden to player until end of the game.

        cardDiv.appendChild(cardImg);
        document.getElementById('dealers-cards-div').appendChild(cardDiv);

        dealerScoreCheck();
}

// Function stand ends player turn and move on to dealer's turn
var stand = function(event) {

    while (dealer.score < 17) {

        hitDealer();
        dealerScoreCheck();
        }

    checkWin();
}

var checkWin = function() {

    if (player.score === 21 || (player.cards.length === 5 && player.score < 21)) {

        winGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn();
        bet("win");
        showBettingBtn();
        hidePlayerBet();
        endGame();
    }

    else if (dealer.score > 21) {

        winGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn();
        bet("win");
        showBettingBtn();
        hidePlayerBet();
        endGame();

    }

    else if (player.score > dealer.score && player.score < 21) {

        winGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn()
        bet("win");
        showBettingBtn();
        hidePlayerBet();
        endGame();
    }

    else if (player.score > 21) {

        loseGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn()
        bet("lose");
        showBettingBtn();
        hidePlayerBet();
        endGame();
    }

    else if (dealer.score === 21 || (dealer.cards.length === 5 && dealer.score < 21)) {

        loseGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn()
        bet("lose");
        showBettingBtn();
        hidePlayerBet();
        endGame();
    }

    else if (dealer.score > player.score) {

        loseGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn();
        bet("lose");
        showBettingBtn();
        hidePlayerBet();
        endGame();
    }

       else if (player.score === dealer.score) {

        drawGame();
        hideHitBtn();
        hideStandBtn();
        hideSurrenderBtn();
        showRestartBtn();
        showBettingBtn();
        hidePlayerBet();
        endGame();
    }

    document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
    downOnLuck();
};

var bet = function(outcome) {

    var playerBet = document.getElementById("bet").valueAsNumber

     if (outcome === "win") {
            player.money += playerBet;
        }

     if (outcome === "lose") {
            player.money -= playerBet;
        }
};

var surrender = function(event) {
    location.reload();
};

var downOnLuck = function() {
    if (player.money <= 0) {

        showSurrenderBtn();
        hideRestartBtn();
        hideBettingBtn();
        document.getElementById("status-test").style.display = "block";
        document.getElementById("status-test").innerHTML = "You lost! You are out of money! :(";
        document.getElementById("status-test").style.backgroundColor = "red";
    }
};

var restart = function(event) {

    document.getElementById("players-cards-div").innerHTML = "";
    document.getElementById("dealers-cards-div").innerHTML = "";
    document.getElementById("game-status").style.display = "none";
    document.getElementById("dealer-points").style.display = "none";
    document.getElementById("dealer-points").innerHTML = "Dealer's Points: ??";

    player.cards = [];
    player.score = 0;

    dealer.cards = [];
    dealer.score = 0;
    numCardsPulled = 0;

    cut1 = 0;
    cut2 = 0;
    temp = [];

    deck = deck.deck.js

    putPlayerUI();
    hideRestartBtn();
    showHitBtn();
    showStandBtn();
    showSurrenderBtn();
    hideBettingBtn();
    showPlayerBet();

    shuffle();
    playerCards();
    playerCards();
    dealerCards();
    dealerCover();
};

///////////////////////////////
///GAME BOARD BUTTON TOGGLES///
///////////////////////////////

var showStartBtn = function(){
    var startButton = document.querySelector('#btn-start');
    document.getElementById("btn-start").style.display = "block";
//     console.log("show 'START' button");
};

var showHitBtn = function(){
    var hitMeButton = document.querySelector('#btn-hit');
    document.getElementById("btn-hit").style.display = "block";
//     console.log("show 'HIT' button");
};

var showStandBtn = function(){
      var startButton = document.querySelector('#btn-stand');
      document.getElementById("btn-stand").style.display = "block";
//       console.log("show 'STAND' button");
};

var showRestartBtn = function(){
    var restartBtn  = document.querySelector('#btn-restart');
    document.getElementById("btn-restart").style.display = "block";
//     console.log("show 'RESTART' button");
};

var showSurrenderBtn = function(){
    var surrenderBtn  = document.querySelector('#btn-surrender');
    document.getElementById("btn-surrender").style.display = "block";
//     console.log("show 'surrenderBtn' button");
};

var hideStartBtn = function(){
    var hideStartButton = document.querySelector('#btn-start');
    document.getElementById("btn-start").style.display = "none";
//     console.log("hide 'START' button");
};

var hideHitBtn = function(){
    var hideHitBtn = document.querySelector('#btn-hit');
    document.getElementById("btn-hit").style.display = "none";
//     console.log("hide 'HIT' button");
};

var hideRestartBtn = function(){
    var surrenderBtn  = document.querySelector('#btn-surrender');
    document.getElementById("btn-restart").style.display = "none";
//     console.log("hide 'surrenderBtn' button");
};

var hideSurrenderBtn = function(){
    var restartBtn  = document.querySelector('#btn-restart');
    document.getElementById("btn-surrender").style.display = "none";
//     console.log("hide 'RESTART' button");
};

var hidePressStart = function() {
    document.getElementById("press-start").style.display = "none";
};


var hideStandBtn = function(){
      var startButton = document.querySelector('#btn-stand');
      document.getElementById("btn-stand").style.display = "none";
//       console.log("hide 'STAND' button");
};

var hideBettingBtn = function(){
      document.getElementById("betting").style.display = "none";
//       console.log("hide 'betting' button");
};

var showBettingBtn = function(){
      document.getElementById("betting").style.display = "block";
//       console.log("show 'betting' button");
};

var showPlayerBet = function(){
      document.getElementById("player-bet").style.display = "block";
};

var hidePlayerBet = function(){
      document.getElementById("player-bet").style.display = "none";
};

////////////////////
//Game UI elements//
////////////////////
var putPlayerUI = function() {

        document.getElementById("players-cards-div").style.display = "block";
        document.getElementById("dealers-cards-div").style.display = "block";

        document.getElementById("points").style.display = "block";
        document.getElementById("dealer-points").style.display = "block";
        document.getElementById("player-money").innerHTML = "Your money: $" + player.money;
        document.getElementById("player-bet").innerHTML = "Your current bet: $" + (document.getElementById("bet").valueAsNumber);
};

var endGame = function() {

        document.getElementById("game-status").style.display = "block";
        document.getElementById("status-test").style.display = "block";
        document.getElementById("dealer-points").style.display = "block";
        document.getElementById('dealer-points').innerHTML = "Dealer's Points: "+dealer.score;
        document.getElementById("cover").setAttribute("src", dealer.cards[1].Cardimage);
}

var loseGame = function() {

        document.getElementById("status-test").innerHTML = "YOU LOSE!";
        document.getElementById("status-test").style.backgroundColor = "maroon";

};

var winGame = function() {

        document.getElementById("status-test").innerHTML = "YOU WIN YAY!";
        document.getElementById("status-test").style.backgroundColor = "green";
};

var drawGame = function() {

        document.getElementById("status-test").innerHTML = "ITS A DRAW!";
        document.getElementById("status-test").style.backgroundColor = "blue";

};

/////////////////////////////////////////////////
///Testing Functions (For card reference only)///
/////////////////////////////////////////////////

// var renderDeck = function() {

//     document.getElementById('deck').innerHTML = '';

//     for (var i = 0; i < deck.length; i++)
//     {
//         var card = document.createElement("div");
//         var cardImg  = document.createElement("img");
//         card.className = "card";
//         cardImg.src = deck[i].Cardimage;
//         // var value = document.createElement("div");
//         // var suit = document.createElement("div");
//         // value.className = "value";
//         // suit.className = "suit";

//         // value.innerHTML= deck[i].Value;
//         // suit.innerHTML = deck[i].Suit;
//         // card.appendChild(value);
//         // card.appendChild(suit);
//         card.appendChild(cardImg);

//         document.getElementById('deck').appendChild(card);
//     }
// };
// renderDeck();
