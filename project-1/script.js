console.log("Hello script.js");

/////////////////////
//Global Variables://
/////////////////////
var player = {cards: [], score: 0}
var dealer = {cards: [], score: 0}
var numCardsPulled = 0;

/////////////////////
//Starting the game//
/////////////////////
var startGame = function(event) {

    hideStartBtn();
    showHitBtn();
    showStandBtn();
    showRestartBtn();
    shuffle();
    playerCards();
    playerCards();
    dealerCards();
    dealerCover();
    putPlayerUI();
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
    console.log(deck);
};

////////////////////
///Game Functions///
////////////////////

var playerScoreCheck = function() {
// To sum up the value of playerCards' array.
    var aceCount = 0;
    player.score = 0;

    for (i = 0; i < player.cards.length; i++) {

        console.log("Value of "+i);
        if (player.cards[i].Value === "J" || player.cards[i].Value === "Q" || player.cards[i].Value === "K") {

            player.score += 10;
            console.log("Added picture-card. Player's current score: "+player.score)
        }

        else if (player.cards[i].Value === "A") {

            player.score += 11;
            aceCount += 1;
            console.log("Added Ace-card. Player's current score: "+player.score)
        }

        else {
            player.score += (parseInt(player.cards[i].Value));
            console.log("Added another card. Player's current score: "+player.score)
        }
}

    if (aceCount > 0 && (player.score > 21)) {
            player.score -=10;
            aceCount -= 1;
        console.log("Ace taken as '1'. Player's current score is "+player.score);
        console.log(aceCount)
        }

    if (player.score > 21) {
        checkWin();
    }

    document.getElementById('points').innerHTML = "Points: "+player.score;;
};

var dealerScoreCheck = function() {
// To sum up the value of playerCards' array.
    var aceCount = 0;
    dealer.score = 0;

    for (i = 0; i < dealer.cards.length; i++) {

        if (dealer.cards[i].Value === "J" || dealer.cards[i].Value === "Q" || dealer.cards[i].Value === "K") {

            dealer.score += 10;
            console.log("Added picture-card. Dealer's current score: "+dealer.score)
        }

        else if (dealer.cards[i].Value === "A") {

            dealer.score += 11;
            aceCount += 1;
            console.log("Added Ace-card. Dealer's current score: "+dealer.score)
        }

        else {
            dealer.score += (parseInt(dealer.cards[i].Value));
            console.log("Added another card. Dealer's current score: "+dealer.score)
        }
    };

    if (aceCount > 0 && (dealer.score > 21)) {
            dealer.score -=10;
            aceCount -= 1;
        console.log("Ace taken as '1'. Dealer's score is "+dealer.score);
        console.log(aceCount)
    }
}

//DealCards, give player their starting 2 cards.
var playerCards = function() {

    player.cards.push(deck[numCardsPulled]);

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        //Player's Hand:
        console.log("Player received card:")
        console.log(deck[numCardsPulled]);

        cardDiv.className = "cardDiv";
        cardImg.src = player.cards[numCardsPulled].Cardimage;

        cardDiv.appendChild(cardImg);
        document.getElementById('player-deck').appendChild(cardDiv);

        playerScoreCheck();
        numCardsPulled += 1;
}

var dealerCards = function() {

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        var dealtCard = deck.pop();
        dealer.cards.push(dealtCard);

        console.log("Dealer received card:")
        console.log(dealtCard);

        cardDiv.className = "cardDiv";
        cardImg.src = dealtCard.Cardimage;

        cardDiv.appendChild(cardImg);
        document.getElementById('dealer-deck').appendChild(cardDiv);

        dealerScoreCheck();
}

var dealerCover = function() {

        var cardDiv = document.createElement("div");
        var cardImg  = document.createElement("img");

        var dealtCard = deck.pop();
        dealer.cards.push(dealtCard);

        console.log("Dealer received card:")
        console.log(dealtCard);

        cardDiv.className = "cardDiv";
        cardImg.src = "images/back.png";

        cardDiv.appendChild(cardImg);
        document.getElementById('dealer-deck').appendChild(cardDiv);

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
        document.getElementById('player-deck').appendChild(cardDiv);

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
        document.getElementById('dealer-deck').appendChild(cardDiv);

        dealerScoreCheck();
}

// Function stand ends player turn and move on to dealer's turn
var stand = function(event) {

        while (dealer.score < 17) {
        hitDealer();
        dealerScoreCheck();
        checkWin()
    }
}

var checkWin = function() {

    if (player.score > 21) {
        console.log("You lose :(");
        document.getElementById("status-lose-player").style.display = "block";
        document.getElementById("status-lose-player").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        document.getElementById("status-win-dealer").style.display = "block";
        document.getElementById("status-win-dealer").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        hideHitBtn();
        hideStandBtn();
    }

    else if (player.score === 21 || (player.cards.length === 6 && player.score < 21)) {
        console.log("You Win! YAY! :)");
        document.getElementById("status-win-player").style.display = "block";
        document.getElementById("status-win-player").innerHTML = "You Win! YAY! :)";
        document.getElementById("status-lose-dealer").style.display = "block";
        document.getElementById("status-lose-dealer").innerHTML = "You Win! YAY! :)";
        hideHitBtn();
        hideStandBtn();
    }

    else if (dealer.score > 21) {
        console.log("You lose :(");
        document.getElementById("status-win-player").style.display = "block";
        document.getElementById("status-win-player").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        document.getElementById("status-lose-dealer").style.display = "block";
        document.getElementById("status-lose-dealer").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        hideHitBtn();
        hideStandBtn();
    }

    else if (dealer.score === 21 || (dealer.cards.length === 6 && dealer.score < 21)) {
        console.log("You Win! YAY! :)");
        document.getElementById("status-lose-player").style.display = "block";
        document.getElementById("status-lose-player").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        document.getElementById("status-win-dealer").style.display = "block";
        document.getElementById("status-win-dealer").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        hideHitBtn();
        hideStandBtn();
    }

    else if (player.score > dealer.score) {
        console.log("You Win! YAY! :)");
        document.getElementById("status-win-player").style.display = "block";
        document.getElementById("status-win-player").innerHTML = "You Win! YAY! :)";
        document.getElementById("status-lose-dealer").style.display = "block";
        document.getElementById("status-lose-dealer").innerHTML = "You Win! YAY! :)";
        hideHitBtn();
        hideStandBtn();
    }

    else if (player.score < dealer.score) {
        console.log("You lose :(");
        document.getElementById("status-lose-player").style.display = "block";
        document.getElementById("status-lose-player").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        document.getElementById("status-win-dealer").style.display = "block";
        document.getElementById("status-win-dealer").innerHTML = "HOUSE WINS! YOU LOSE! :'(";
        hideHitBtn();
        hideStandBtn();
    }

};

///////////////////////////////
///GAME BOARD BUTTON TOGGLES///
///////////////////////////////

var showStartBtn = function(){
    var startButton = document.querySelector('#btn-start');
    document.getElementById("btn-start").style.display = "block";
    console.log("show 'START' button");
};

var hideStartBtn = function(){
    var hideStartButton = document.querySelector('#btn-start');
    document.getElementById("btn-start").style.display = "none";
    console.log("hide 'START' button");
};

var showHitBtn = function(){
    var hitMeButton = document.querySelector('#btn-hit');
    document.getElementById("btn-hit").style.display = "block";
    console.log("show 'HIT' button");
};

var hideHitBtn = function(){
    var hideHitBtn = document.querySelector('#btn-hit');
    document.getElementById("btn-hit").style.display = "none";
    console.log("hide 'HIT' button");
};

var showRestartBtn = function(){
    var restartBtn  = document.querySelector('#btn-restart');
    document.getElementById("btn-restart").style.display = "block";
    console.log("show 'RESTART' button");
};

var hideRestartBtn = function(){
    var restartBtn  = document.querySelector('#btn-restart');
    document.getElementById("btn-restart").style.display = "none";
    console.log("hide 'RESTART' button");
};

var restart = function(event) {
location.reload();
};

var hidePressStart = function() {
    document.getElementById("press-start").style.display = "none";
};

var showStandBtn = function(){
      var startButton = document.querySelector('#btn-stand');
      document.getElementById("btn-stand").style.display = "block";
      console.log("show 'STAND' button");
};

var hideStandBtn = function(){
      var startButton = document.querySelector('#btn-stand');
      document.getElementById("btn-stand").style.display = "none";
      console.log("hide 'STAND' button");
};

////////////////////
//Game UI elements//
////////////////////
var putPlayerUI = function() {
    document.getElementById("points").style.display = "block";
    // document.getElementById("money").style.display = "block";
    document.getElementById("status-win-player").style.display = "hidden";
    document.getElementById("status-lose-player").style.display = "hidden";
    document.getElementById("status-win-dealer").style.display = "hidden";
    document.getElementById("status-lose-dealer").style.display = "hidden";
    document.getElementById("status-draw").style.display = "hidden";
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