//variable for wordObject which will be chosen at random in startGame function 
let wordObject;
//the array of spans showing the letters to user once guessed
let wordSpanArray = [];
//counter for wrong guesses
let wrongGuesses = 0;
// div that will contain the span elements
let wordSpaces = document.getElementById("word-to-guess")
// div containing the guesses representation
const guessesDiv = document.querySelector(".guesses");

/**
 * listen for click on Category Buttons in word-area
 */
function initialiseCategories() {
    let categoryButtons = document.getElementsByClassName("category-btn");
    // iterate and listen for click, on click run getWordType
    Array.from(categoryButtons).forEach(button => button.addEventListener("click", getWord));
}

/**
 * get word type category from button click, hide button, get random wordObject by type, run startGame()
 */
function getWord() {
    let wordType = this.innerHTML;
    this.parentElement.parentElement.classList.add("hidden");
    //filter the words array by the chosen type, i.e. verb or adjective
    let wordsByType = words.filter(word => word.type === wordType);
    //get a random word object from the wordsByType array 
    wordObject = wordsByType[Math.floor(Math.random() * wordsByType.length)];
    startGame(wordType);
}

/**
 * to get word to be guessed at various stages in game
 * @returns word from wordObject in uppercase
 */
 function getWordToGuess() {
    return wordObject.word.toUpperCase();
}

/**
 * show blank spaces for word, show hint button, hide wordtype buttons and intro text.
 * @param {*verb or adjective} wordType 
 */
function startGame(wordType) {
    //show the div with text and hint button
    showOrHideElement("word-area-in-play");
    //show word category
    document.getElementById("category").innerText = `${wordType.toUpperCase()}`;
    //show the words spaces - equal to length of the chosen word
    createLetterSpaces();
    updateKeyboard("enable");
    //when the Hint button is clicked, run the function giveHint
    document.getElementById("hint").addEventListener("click", giveHint);
}

function createLetterSpaces() {
    // the word from the wordObject, in uppercase
    let selectedWord = getWordToGuess();
    //for each letter in the selected word, create a span, add class and append to the wordSpaces div, and push to wordSpanArray
    for (let i = 0; i < selectedWord.length; i++) {
        //create span element
        span = document.createElement("span");
        //set the innerText to blank space
        span.innerText = " ";
        //add the class of letter-space to each span
        span.setAttribute("class", "letter-space");
        //add the spans to the wordSpaces div
        wordSpaces.appendChild(span);
        //add the span to the wordSpanArray (used later to show letters to user when correct)
        wordSpanArray.push(span);
        console.log(wordSpanArray);
    };
}

/**
 * add or remove the "hidden" class from element
 * @param {string} elementId 
 */
function showOrHideElement(elementId) {
    document.getElementById(elementId).classList.toggle("hidden");
}

/**
 * change keyboard state, depending on the value of update
 * @param {string} update can be enable, disable or revertColours 
 */
function updateKeyboard(update) {
    let keys = document.querySelectorAll(".key");
    if (update === "enable") {
        keys.forEach(key => key.removeAttribute("disabled"));
        keys[0].focus();
        keys.forEach(key => key.addEventListener("click", checkLetter));
    } else if (update === "disable") {
        keys.forEach(key => key.setAttribute("disabled", true));
    } else if (update === "revertColours") {
        keys.forEach(key => key.classList.remove("correct"));
        keys.forEach(key => key.classList.remove("incorrect"));
    }
}

/**
 * shows the text of the hint associated with the word, when the Hint button is clicked
 */
function giveHint() {
    //hide the button that was clicked, i.e. the Hint button
    this.classList.add("hidden");
    // show the hint text p tag (sibling of Hint button) by removing hidden class
    this.nextElementSibling.classList.remove("hidden");
    //add the hint to the element so that it shows on screen
    this.nextElementSibling.children[1].innerText = `${wordObject.hint}`;
}

/**
 * when the key click event, disable the key, check if wrong or right guess and run appropriate function
 */
function checkLetter() {
    //disable the key that was pressed so it can't be pressed again
    let keyPressed = this;
    keyPressed.setAttribute("disabled", true);
    let wordToGuess = getWordToGuess();
    console.log(wordToGuess);
    //wrong guess will be if indexOf is -1, i.e. letter is not in the word
    console.log(wordToGuess.indexOf(keyPressed.innerHTML));
    let isWrongGuess = wordToGuess.indexOf(keyPressed.innerHTML) === -1;
    // if it's a wrong guess, run wrongGuess function, otherwise run correctGuess function with guessedLetter
    isWrongGuess ? wrongGuess(keyPressed) : correctGuess(keyPressed);
}

/**
 * increase wrongGuesses counter, show lives used up, check if game lost, if all lives used up
 */
function wrongGuess(keyPressed) {
    // console.log(keyPressed);
    keyPressed.classList.add("incorrect");
    // increase the wrong guesses counter by 1
    wrongGuesses++;
    //remove one of the lives from the guess area
    //get the img tag with the data-guess value equal to the wrongGuesses value
    let lifeUsed = document.querySelector(`img[data-guess="${wrongGuesses}"]`);
    //add the hidden class to it
    lifeUsed.classList.add("hidden");
    // get the monster graphic
    let monster = document.querySelector(".monster");
    // add the jump class to animate it with transforms
    monster.classList.add("jump");
    // timeout to remove the jump class 
    setTimeout (() => {
        monster.classList.remove("jump");
    }, 150);
    //check if max guesses used up
    if (wrongGuesses >= 7) {
        //set status and run the endGame function using this status
        endGame("lost");
    }
}

/**
 * update the letter on screen, check if game won, if all letters now guessed
 * @param {*} guessedLetter - the letter clicked on
 */
function correctGuess(keyPressed) {
    keyPressed.classList.add("correct");
    let guessedLetter = keyPressed.innerHTML
    let wordToGuess = getWordToGuess();
    console.log(wordToGuess);
    // loop through the word
    for (let i = 0; i < wordToGuess.length; i++) {
        //if the guess matches at that index
        if (wordToGuess[i] === guessedLetter) {
            //update the wordSpanArray with that letter
            wordSpanArray[i].innerText = guessedLetter;
        }
    }
    // then check if game is won or not
    console.log("won check needed");
    // wordCheck is the text from each span element in the word-to-guess div
    let wordCheck = document.getElementById("word-to-guess").textContent;
    console.log(wordCheck);
    // if wordCheck is same as selectedWord then the word has been guessed and game is won
    if (wordCheck === wordToGuess) {
        //set status and run the endGame function using this status
        endGame("won");
    }
}

/**
 * show the game over text, show the Play Again button and hide divs from game-in-play
 * @param {string} status won or lost
 */
function endGame(status) {
    //get the game-over-text div and remove hidden class
    showOrHideElement("game-over-text-box");
    // add class to parent div, to center the text and icon
    document.getElementById("game-over-text-box").parentElement.classList.add("game-over");
    let message = document.getElementById("won-or-lost-msg");
    if (status === "lost") {
        message.textContent = "SORRY, YOU LOST!"
    } else {
        message.textContent = "YOU WON A TROPHY!";
        // hide the monster and lives from guesses area, leaving the trophy icon 
        let guesses = document.querySelectorAll("img.guess:not(.trophy)");
        guesses.forEach(guess => guess.classList.add("hidden"));
        // update the score
        // get the number from the span with id of score
        let score = parseInt(document.getElementById("score").textContent);
        // add one to it
        document.getElementById("score").textContent = ++score;
    }
    // show the Game Over div
    showOrHideElement("word-area-game-over");
    // show the word
    document.querySelector(".word").textContent = `${wordObject.word}`;
    // show the word meaning
    document.querySelector(".definition").textContent = `${wordObject.meaning}`;
    // hide the word-area-in-play div
    showOrHideElement("word-area-in-play");
    //lock the keyboard
    updateKeyboard("disable");
    // add event listener for Play Again button to run reset function
    document.getElementById("reset").addEventListener("click", resetGame);
}

function resetGame() {
    //show the div for game at start
    showOrHideElement("word-area-at-start");
    // hide the div that was previously shown at game over stage
    showOrHideElement("word-area-game-over");
    // re-set the wrong guesses back to 0
    wrongGuesses = 0;
    // remove the game over text
    document.querySelector(".game-over-text").classList.add("hidden");
    // show the monster icon, guesses and trophy
    let lives = document.querySelectorAll(".guess");
    lives.forEach(life => life.classList.remove("hidden"));
    // remove the spans from word-spaces div (spans were created during game, for each letter of word to guess)
    while(wordSpaces.hasChildNodes()) {
        wordSpaces.removeChild(wordSpaces.firstChild);
    } 
    // clear the wordSpanArray back to empty
    wordSpanArray = [];
    // hide the hint text and show the Hint button
    let hintButton = document.getElementById("hint");
    hintButton.classList.remove("hidden");
    hintButton.nextElementSibling.classList.add("hidden");
    guessesDiv.classList.remove("game-over");
    //remove colours from pressedKeys
    updateKeyboard("revertColours");
}

/**
 * listen for click to open Instructions Modal box
 */
function initialiseModal() {
    //open modal button variable
    const open = document.getElementById("instructions-open")
    //close modal button variable
    const close = document.getElementById("close-modal")
    // on click of Instructions button, get the instructions-modal el and add visible class to it
    open.addEventListener("click", function () {
        document.getElementById("instructions-modal").classList.add("visible");
        //add focus to close button so user can press enter to close
        close.focus();
    });
    // on click of close button, remove the visible class from modal
    close.addEventListener("click", function () {
        document.getElementById("instructions-modal").classList.remove("visible");
    });
    // to close the modal if user clicks anywhere on window
    window.onclick = function (event) {
        if (event.target == document.querySelector(".modal.visible")) {
            document.querySelector(".modal.visible").classList.remove("visible");
        }
    }
}

//when DOM has loaded, listen for button click on Adjective/Verb buttons to start game, or click on open Modal
document.addEventListener("DOMContentLoaded", function () {
    initialiseCategories();
    initialiseModal();
})