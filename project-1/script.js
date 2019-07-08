console.log("Hello script.js");

/////////////////////
//Global Variables://
/////////////////////
var deck = new Array();
var playersHand = [];

/////////////////////
//Starting the game//
/////////////////////
var startGame = function(event) {
    hideStartBtn();
    showHitBtn();
    showStayBtn();
    showRestartBtn();
    shuffle();
    dealCards();
}

///////////////////////
//Card Deck Functions//
///////////////////////

//Shuffles deck at the start of the game.
var shuffle = function() {

    for (i = 0; i < 200; i++) {

        var cut1 = Math.floor((Math.random() * cards.length));
        var cut2 = Math.floor((Math.random() * cards.length));
        var temp = cards[cut1];

        cards[cut1] = cards[cut2];
        cards[cut2] = temp;
    }
    console.log(cards);
};

var scoreCheck = function() {
// To sum up the value of playerCards' array.
    var sum = 0;
    var pictureCount = 0;
    var aceCount = 0;

    for (i = 0; i < playersHand.length; i++) {

        if (playersHand[i].Value === "J" || playersHand[i].Value === "Q" || playersHand[i].Value === "K") {

            sum += 10;
            pictureCount += 1;
            console.log("Added picture-card. Current score: "+sum)
        }

        else if (playersHand[i].Value === "A") {

            sum += 11;
            aceCount += 1;
            console.log("Added Ace-card. Current score: "+sum)
        }

        else {
            sum += (parseInt(playersHand[i].Value));
            console.log("Added another card. Current score: "+sum)
        }
    };

    if (aceCount > 0 && (sum > 21)) {
            sum -=10;
            aceCount -= 1;
        console.log("Ace taken as 1"+sum);
        console.log(aceCount)
    }

    if (sum > 21) {
        console.log("You lose :(");
    }

    else if (sum === 21 || (playersHand.length === 7 && sum < 21)) {
        console.log("You Win! YAY! :)");
    }
};

//DealCards, give player their starting 2 cards.
var dealCards = function() {

    document.getElementById('deck').innerHTML = '';

    for (var i = 0; i < 2; i++) {

        var card = document.createElement("div");
        var cardImg  = document.createElement("img");

            playersHand.push(cards[i]);
            card.className = "card";
            cardImg.src = playersHand[i].Cardimage;

            card.appendChild(cardImg);
            document.getElementById('deck').appendChild(card);
            console.log(playersHand);

            scoreCheck();
    }
};

// HitMe, Adds an extra card to the player's array.
var hitMe = function(event) {

    var card = document.createElement("div");
    var cardImg  = document.createElement("img");
    // var x = (Math.floor(Math.random() * cards.length));

        for (var x = 0; x < playersHand.length; x++)

        var dealtCard = cards.pop();
        playersHand.push(dealtCard);

        card.className = "card";
        cardImg.src = playersHand[x].Cardimage;

        card.appendChild(cardImg);
        document.getElementById('deck').appendChild(card);

        scoreCheck();
        checkFor21();
};

// Stay, End the game and check how many points the player has.
var stay = function(event) {
    checkFor21();
};

///////////////////////////////
///GAME BOARD BUTTON TOGGLES///
///////////////////////////////

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
};

/////////////////////
/// THINGS TO ADD ///
/////////////////////

var restart = function(event) {
};

//////////////////////////////////////////
///Testing Functions (Not used in game)///
//////////////////////////////////////////

// var renderDeck = function() {

//     document.getElementById('deck').innerHTML = '';

//     for (var i = 0; i < cards.length; i++)
//     {
//         var card = document.createElement("div");
//         var cardImg  = document.createElement("img");
//         card.className = "card";
//         cardImg.src = cards[i].Cardimage;
//         // var value = document.createElement("div");
//         // var suit = document.createElement("div");
//         // value.className = "value";
//         // suit.className = "suit";

//         // value.innerHTML= cards[i].Value;
//         // suit.innerHTML = cards[i].Suit;
//         // card.appendChild(value);
//         // card.appendChild(suit);
//         card.appendChild(cardImg);

//         document.getElementById('deck').appendChild(card);
//     }
// };
// renderDeck();