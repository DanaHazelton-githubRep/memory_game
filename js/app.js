 /*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var deck = [];
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
//Varibles
let clicksPlayed = 0;
let cardsPlayed = [];
let cardsMatch = [];

const cards = [...document.querySelectorAll('.deck li')];
const gameMoves = document.querySelectorAll('.moves');

function flipCard(card) {
    console.log(this);
    this.classList.add('open', 'show');
    cardsPlayed.push(this);
    cardPlay(card);
    setCounter();
}

cards.forEach(card => card.addEventListener('click', flipCard));


function cardPlay () {
    //console.log(this);
    //console.log(typeof cards);
    //console.log(cardsPlayed.length)
    if (cardsPlayed.length < 2) {
        //cardsPlayed.push(card);
        console.log('Pick another');
    } else
    compareCards();
}

//const showCards = ;

function compareCards() {
    //console.log(this);
    //console.log(cardsPlayed[0].firstElementChild);
    //console.log(cardsPlayed[1].firstElementChild);
    cards.forEach(card => card.removeEventListener('click', flipCard));
    if (cardsPlayed[0].firstElementChild.className === cardsPlayed[1].firstElementChild.className) {
        console.log('Match');
        for (i in cardsPlayed) {
            console.log(i);
            console.log(cardsPlayed);
            cardsPlayed[i].classList.add('match');
            cardsMatch.push(cardsPlayed[i]);
        };
        if (cardsMatch.length === 16) {
            console.log('Winner- build modalhere');
            //youWin();
            toggleModal()
        }
        //cardsPlayed[1].classList.add('match');
        cardsPlayed = [];

        //cards.forEach(card => card.addEventListener('click', flipCard));
    } else {
        console.log('flip back over');
        //window.setTimeout(window.alaert, 100000, 'Try again');
        for (i in cardsPlayed) {
            cardsPlayed[i].classList.remove('open', 'show');
        }
        //cardsPlayed[0].classList.remove('open', 'show');
        //cardsPlayed[1].classList.remove('open', 'show');
        cardsPlayed = [];
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function setCounter() {
    //timer = setInterval(setTimer,1000);
    clicksPlayed ++;
    gameMoves[0].textContent = clicksPlayed;
    console.log(clicksPlayed);
};


var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    gameMoves[1].textContent = clicksPlayed;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
//closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


