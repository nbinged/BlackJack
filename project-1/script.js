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
    showRestartBtn();
    shuffle();
    dealCards();
    hidePressStart();
    putPlayerUI();
    // showStayBtn();
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
        console.log("Ace taken as '1'. New score is "+sum);
        console.log(aceCount)
    }

    if (sum > 21) {
        console.log("You lose :(");
        document.getElementById("status-lose").style.display = "block";
        document.getElementById("status-lose").innerHTML = "YOU LOSE! :(";
        hideHitBtn();

    }

    else if (sum === 21 || (playersHand.length === 7 && sum < 21)) {
        console.log("You Win! YAY! :)");
        document.getElementById("status-win").style.display = "block";
        document.getElementById("status-win").innerHTML = "You Win! YAY! :)";
        hideHitBtn();
    }

    document.getElementById('points').innerHTML = "Points: "+sum;
};

//DealCards, give player their starting 2 cards.
var dealCards = function() {

    for (var i = 0; i < 2; i++) {

        var card = document.createElement("div");
        var cardImg  = document.createElement("img");

            playersHand.push(cards[i]);
            card.className = "card";
            cardImg.src = playersHand[i].Cardimage;

            card.appendChild(cardImg);
            document.getElementById('deck').appendChild(card);

            scoreCheck();
    }
};

// var createUI = function() {

//     document.getElementById('players').innerHTML = '';

//         var div_player = document.createElement('div');
//         var div_playerid = document.createElement('div');
//         var div_hand = document.createElement('div');
//         var div_points = document.createElement('div');

//         div_points.className = 'points';
//         div_points.id = 'points_' + i;
//         div_player.id = 'player_' + i;
//         div_player.className = 'player';
//         div_hand.id = 'hand_' + i;

//         div_playerid.innerHTML = players[i].ID;
//         div_player.appendChild(div_playerid);
//         div_player.appendChild(div_hand);
//         div_player.appendChild(div_points);
//         document.getElementById('players').appendChild(div_player);
// }

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

            // // Stay, End the game and check how many points the player has.
            // var stay = function(event) {

            //     if (sum < 21) {
            //     console.log("You lose :(");
            //     }
            // }
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
}

// var showStayBtn = function(){
//       var startButton = document.querySelector('#btn-stay');
//       document.getElementById("btn-stay").style.display = "block";
//       console.log("show 'STAY' button");
// };

// var hideStayBtn = function(){
//       var startButton = document.querySelector('#btn-stay');
//       document.getElementById("btn-stay").style.display = "none";
//       console.log("hide 'STAY' button");
// };

////////////////////
//Game UI elements//
////////////////////
var putPlayerUI = function() {

    document.getElementById("points").style.display = "block";
    document.getElementById("status").style.display = "hidden";

    // var pointsUI = document.createElement("div");
    // var statusUI  = document.createElement("div");

    // pointsUI.id = "pointsUI";
    // statusUI.id = "statusUI";
}

/////////////////////////////////////////////////
///Testing Functions (For card reference only)///
/////////////////////////////////////////////////

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