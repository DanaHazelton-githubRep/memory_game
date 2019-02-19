 /*
 * Create a list that holds all of your cards
 */
 const cards = [...document.querySelectorAll('.deck li')];

//Varibles
let clicksPlayed = 0;
let cardsPlayed = [];
let cardsMatch = [];


//const deck = document.querySelector(".deck");
const gameMoves = document.querySelectorAll('.moves');
const gameTime = document.querySelector('.time');

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
const deck = document.querySelector(".deck");

function initGame() {
    //Reset cards flip back over
    for (i in cardsMatch) {
            cardsMatch[i].classList.remove('open', 'show', 'match');
        }
        cardsMatch = [];
    //shuffle deck
    let shuffleCards = shuffle(cards);
    for (let i = 0; i < shuffleCards.length; i++) {
        [].forEach.call(shuffleCards, function(item){
            deck.appendChild(item);
            clicksPlayed = 0;
            gameMoves[0].textContent = clicksPlayed;
        });
    }
    restoreStars();
    function restoreStars() {
        console.log('hello')
        const star = document.querySelector('.stars');
        if (star.length != 2);
        //star.appendChild();
    }
    cards.forEach(card => card.addEventListener('click', flipCard));
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
function flipCard(card) {
    //console.log(this);
    //setCounter();
    this.classList.add('open', 'show');
    cardsPlayed.push(this);
    cardPlay(card);
    //setCounter();
}

function cardPlay () {
    // if (clicksPlayed = 1){
    //     var stTimer = setInterval(gmTimer, 1000);
    //     //let t = 0;
    // }
    if (cardsPlayed.length < 2) {
        //cardsPlayed.push(card);
        console.log('Pick another');
    } else {
        cards.forEach(card => card.removeEventListener('click', flipCard));
        setTimeout(compareCards, 500);
        setCounter();
    }
}

//let t = 0;
function gmTimer() {
    //console.log(this);
    gameTime.textContent ++;
    console.log(gameTime.textContent);
    //document.getElementByID('.time').innerHTML = t.toLocaleTimeString();
    //gameTime.textContent = t
}

function setCounter() {
    //timer = setInterval(setTimer,1000);
    clicksPlayed ++;
    gameMoves[0].textContent = clicksPlayed;
    //console.log(clicksPlayed);
    starRating();
};


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
            toggleModal()
        }
    } else {
        window.setTimeout(window.alaert, 3000, 'Try again');
        for (i in cardsPlayed) {
            cardsPlayed[i].classList.remove('open', 'show');
        }
        //starRating();
        cardsPlayed = [];
    };
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//Star rating
function starRating() {
    const star = document.querySelector('.stars');
    const firstStar = star.firstElementChild;
    if (clicksPlayed === 8) {
        console.log(star);
        star.removeChild(firstStar);
    } else if (clicksPlayed === 16){
        console.log('Horrible');
        star.removeChild(firstStar);
    };
}

//On page load run initGame();
windowOnLoad = initGame();

// Code for modal
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    cards.forEach(card => card.removeEventListener('click', flipCard));
    gameMoves[1].textContent = clicksPlayed;
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

modal.addEventListener("click", toggleModal);
//closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


