 /*
 * Create a list that holds all of your cards
 */
const cards = [...document.querySelectorAll('.deck li')];
//const cards = document.querySelectorAll('.deck li');

const deck = document.querySelector(".deck");

//Varibles
let clicksPlayed = 0;
let cardsPlayed = [];
let cardsMatch = [];



const gameMoves = document.querySelectorAll('.moves');

const star = document.querySelector('.stars');
const firstStar = star.children;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function initGame() {
    //Reset all cards to start game.
    for (i in cardsMatch) {
            cardsMatch[i].classList.remove('open', 'show', 'match');
    }
    // Clear out cardMatch list
    cardsMatch = [];
    for (i in cardsPlayed) {
        cardsPlayed[i].classList.remove('open', 'show');
    }
    // Clear cardsPlayed list
    cardsPlayed = [];
    //restore Stars back to three
    firstStar[0].style.visibility = "visible";
    firstStar[1].style.visibility = "visible";

    //shuffle deck
    const shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        [].forEach.call(shuffleCards, function(item){
            deck.appendChild(item);
            clicksPlayed = 0;
            gameMoves[0].textContent = clicksPlayed;
        });
    }
    //Stop Interval timer and Reset Clock back to 0
    clearInterval(stClock);
    gameTime[0].innerHTML = "0:0:0";
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Event Degration to add eventListner
deck.addEventListener('click', event => {
        const cardTarget = event.target;
        if (cardTarget.classList.contains('card')) {
            flipCard(cardTarget);
        }
    });

function flipCard(cardTarget) {
    console.log(this);
    cardTarget.classList.add('open');
    cardTarget.classList.add('show');
    cardsPlayed.push(cardTarget);
    cardPlay(cardTarget);
}

function cardPlay () {
    //console.log(cardsPlayed.length);
    if (cardsPlayed.length < 2) {
        console.log('Pick another');
        setCounter();
    } else {
        setTimeout(compareCards, 500);
    }
}

function setCounter() {
    if (clicksPlayed === 0) {
        console.log('start clock');
        clockStart();
    }
    //clockStart();
    console.log(clicksPlayed);
    clicksPlayed ++;
    console.log(clicksPlayed);
    gameMoves[0].textContent = clicksPlayed;
    starRating();
};

// Clock Timer Code
let stClock=[];
const gameTime = [...document.querySelectorAll('.time')];
function clockStart() {
    let sec = 0, min = 0, hr = 0;
    console.log('time start');
        stClock = setInterval(function(){
        gameTime.innerHTML = hr+":"+min+":"+sec+"";
        gameTime[0].innerHTML = gameTime.innerHTML;
        sec++;
            if(sec == 60){
                min++;
                sec = 0;
            };
            if(min == 60){
                hr++;
                min = 0;
            };
        },1000);
}

//Compare flipped cards
function compareCards() {
    if (cardsPlayed[0].firstElementChild.className === cardsPlayed[1].firstElementChild.className) {
        console.log('Match');
        for (i in cardsPlayed) {
            cardsPlayed[i].classList.add('match');
            cardsMatch.push(cardsPlayed[i]);
        };
        cardsPlayed = [];
        if (cardsMatch.length === 16) {
            clearInterval(stClock);
            toggleModal();
        }
    } else {
        //window.setTimeout(window.alert, 3000, 'Try again');
        for (i in cardsPlayed) {
            cardsPlayed[i].classList.remove('open', 'show');
        }
        cardsPlayed = [];
    };
}

//Star rating
function starRating() {
    if (clicksPlayed === 10) {
        //console.log(star);
        firstStar[0].style.visibility = "collapse";
    } else if (clicksPlayed === 16){
        console.log('Horrible');
        firstStar[1].style.visibility = "collapse";
    };
}

// Code for modal
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".button");

function toggleModal() {
    gameMoves[1].textContent = clicksPlayed;
    gameTime[1].innerHTML = gameTime.innerHTML;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

//modal.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


//On page load run initGame();
windowOnLoad = initGame();