
/**
 * listen for click on Category Buttons, on click hide the clicked button and run getWord using wordCategory
 */
function initialiseCategories() {
    let categoryButtons = document.getElementsByClassName("category-btn");
    //Using forEach instead of if/else to allow for more categories in future
    Array.from(categoryButtons).forEach(button => button.addEventListener("click", function () {
        let wordCategory = this.innerHTML;
        this.parentElement.parentElement.classList.add("hidden");
        getWord(wordCategory);
    }));
}

/**
 * show word-area-in-play, show wordCategory, create letter spaces for word, enable keyboard, eventListener on Hint btn 
 * @param {*string} wordCategory Verb or Adjective
 */
function startGame(wordCategory, wordObject) {
    toggleElementVisibility("word-area-in-play");
    document.getElementById("category").innerText = `${wordCategory.toUpperCase()}`;
    let word = wordObject.word.toUpperCase();
    createLetterSpaces(word);
    storeWordProperties(wordObject);
    updateKeyboard("enable");
    document.getElementById("hint").addEventListener("click", giveHint);
}

/**
 * create blank spaces (spans) for letters in word to be guessed in span-container div, add the letter as a data-attribute (used later to check guesses)
 * @param {string} word from wordObject
 */
function createLetterSpaces(word) {
    for (let i = 0; i < word.length; i++) {
        let span = document.createElement("span");
        span.setAttribute("class", "letter-space");
        span.setAttribute("data-letter", word[i]);
        document.getElementById("span-container").appendChild(span);
    };
}

/**
 * store the hint, word and definition properties of wordObject in the relevant html elements, to be shown later at different stages of game
 * @param {Object} wordObject word, hint, definition
 */
function storeWordProperties(wordObject) {
    document.getElementById("hint").nextElementSibling.children[1].textContent = `${wordObject.hint}`;
    document.querySelector(".word").textContent = `${wordObject.word}`;
    document.querySelector(".definition").textContent = `${wordObject.meaning}`;
}

/**
 * add or remove the "hidden" class from element
 * @param {string} elementId 
 */
function toggleElementVisibility(elementId) {
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
 * hide Hint button, show p tag which holds hint text
 */
function giveHint() {
    this.classList.add("hidden");
    this.nextElementSibling.classList.remove("hidden");
}

/**
 * disable the key pressed, check if wrong or right guess and run appropriate handleGuess function
 */
function checkLetter() {
    let keyPressed = this;
    keyPressed.setAttribute("disabled", true);
    let wordToGuess = document.querySelector(".word").textContent.toUpperCase();
    console.log(wordToGuess);
    //wrong guess will be if indexOf is -1, i.e. letter is not in the word
    let isWrongGuess = wordToGuess.indexOf(keyPressed.innerHTML) === -1;
    // if it's a wrong guess, run handleIncorrectGuess function, otherwise run correctGuess function
    isWrongGuess ? handleIncorrectGuess(keyPressed) : handleCorrectGuess(keyPressed);
}

/**
 * add red colour to keyPressed, decrease chancesRemaining, hide guess element, animate monster, check if game lost
 */
function handleIncorrectGuess(keyPressed) {
    keyPressed.classList.add("incorrect");
    //chances remaining is the number of imgs with data-guess attribute that are not already hidden
    let chancesRemaining = document.querySelectorAll(`img[data-guess]:not(.hidden)`).length;
    console.log(chancesRemaining);
    //decrease chancesRemaining by 1 and hide the element with corresponding data-guess value
    document.querySelector(`img[data-guess="${chancesRemaining--}"]`).classList.add("hidden");
    console.log(chancesRemaining);
    //animate monster graphic by adding jump class, remove jump class after timeout of 150ms
    let monster = document.querySelector(".monster");
    monster.classList.add("jump");
    setTimeout (() => {
        monster.classList.remove("jump");
    }, 150);
    //check if max guesses used up, if they are then run endGame function with parameter false
    if (chancesRemaining === 0) {
        endGame(false);
    }
}

/**
 * add correct colour to keyPressed, update letter on screen in appropriate span space, check if game won
 * @param {*} keyPressed the letter clicked on
 */
function handleCorrectGuess(keyPressed) {
    keyPressed.classList.add("correct");
    let guessedLetter = keyPressed.innerHTML
    //get the data-letter values from letter-space spans, put into array representing word to guess
    let letterSpans = document.querySelectorAll(".letter-space");
    let lettersArray = [];
    letterSpans.forEach(letter => lettersArray.push(letter.dataset.letter));
    console.log(lettersArray);
    // loop through the word, check if guessedLetter matches at that index, update innerText when it does
    for (let i = 0; i < lettersArray.length; i++) {
        if (lettersArray[i] === guessedLetter) {
            letterSpans[i].innerText = guessedLetter;
        }
    }
    // then check if game is won or not
    console.log("won check needed");
    // guessedLetters is the text from each span element i.e. letters already guessed correctly
    let guessedLetters = document.getElementById("span-container").textContent;
    console.log(guessedLetters);
    // if guessedLetters is same as the data-letter values then the word has been guessed and game is won
    if (guessedLetters === lettersArray.join("")) {
        //run the endGame function using "won" status, after short timeout so user can see last letter added to word
        setTimeout(() => {
            endGame(true);
        }, 300);
    }
}

/**
 * show the game over message, show word & meaning, disable keyboad, add evenListener on Play Again button
 * @param {boolean} gameWon true or false  
 */
function endGame(gameWon) {
    if (gameWon) {
        showGameOverMsg("YOU WON A TROPHY!")
        updateScore();
        showTrophy();
    } else {
        showGameOverMsg("SORRY, YOU LOST!")
    }
    showWordMeaning();
    updateKeyboard("disable");
    document.getElementById("reset").addEventListener("click", resetGame);
}

/**
 * show game-over box, add centered class, show text of won or lost msg parameter passed from endGame 
 * @param {string} msg won or lost message
 */
function showGameOverMsg(msg) {
    toggleElementVisibility("game-over-text-box");
    document.getElementById("game-over-text-box").parentElement.classList.add("centered");
    document.getElementById("won-or-lost-msg").textContent = msg;
}

/**
 * Show the word and its meaning in the word-area-game-over div, hide word-area-in-play div
 */
function showWordMeaning() {
    toggleElementVisibility("word-area-game-over");
    toggleElementVisibility("word-area-in-play");
}

/**
 * add 1 to Score at endGame when status is won. Get previous score and add 1 to it
 */
function updateScore() {
    let score = parseInt(document.getElementById("score").textContent);
    document.getElementById("score").textContent = ++score;
}

/**
 * Show trophy and hide other guess imgs, animate trophy by adding .shake class and removing after 1second
 */
function showTrophy() {
    let guesses = document.querySelectorAll("img.guess:not(.trophy)");
    guesses.forEach(guess => guess.classList.add("hidden"));
    let trophy = document.querySelector(".trophy");
    trophy.classList.add("shake");
    setTimeout(() => {
        trophy.classList.remove("shake");
    }, 1000);
}

/**
 * show 'at-start', hide 'game-over' word areas, resetGuesses, removeLetterSpaces, resetHintBtn, remove colours from pressedKeys
 */
function resetGame() {
    toggleElementVisibility("word-area-at-start");
    toggleElementVisibility("word-area-game-over");
    resetGuesses();
    removeLetterSpaces();
    resetHintBtn();
    updateKeyboard("revertColours");
}

/**
 * reset Guesses area, hide game-over-text, show all the .guess graphics and remove centred class, re-set wrong guesses counter
 */
function resetGuesses() {
    toggleElementVisibility("game-over-text-box");
    let guessImgs = document.querySelectorAll(".guess");
    guessImgs.forEach(guessImg => guessImg.classList.remove("hidden"));
    document.querySelector(".guesses").classList.remove("centered");
}

/**
 * // remove spans for letter spaces that were created at startGame
 */
function removeLetterSpaces() {
    let spanContainer = document.getElementById("span-container");
    while (spanContainer.hasChildNodes()) {
        spanContainer.removeChild(spanContainer.firstChild);
    }
}

/**
 * Hide the hint text, show the hint button
 */
//Note: not using toggle class because hint btn/text might already be visible/hidden depending on whether hint shown in game
function resetHintBtn() {
    let hintButton = document.getElementById("hint");
    hintButton.classList.remove("hidden");
    hintButton.nextElementSibling.classList.add("hidden");
}

/**
 * open or close instructions Modal when clicked
 */
function initialiseModal() {
    // on click add visible class to instructions-modal, put focus on close btn so user can press enter to close
    document.getElementById("instructions-open").addEventListener("click", function () {
        toggleModalVisibility();
        document.getElementById("close-modal").focus();
    });
    // on click of close button, remove the visible class from instructions-modal
    document.getElementById("close-modal").addEventListener("click", function () {
        toggleModalVisibility();
    });
    // to close the modal if user clicks anywhere on window
    window.onclick = function (event) {
        if (event.target == document.querySelector(".modal.visible")) {
            document.querySelector(".modal.visible").classList.remove("visible");
        }
    }
    /**
     * add or remove visible class to instructions-modal
     */
    function toggleModalVisibility() {
        document.getElementById("instructions-modal").classList.toggle("visible");
    }
}

//when DOM has loaded, listen for button click on Adjective/Verb buttons to start game, or click on instructions-open button
document.addEventListener("DOMContentLoaded", function () {
    initialiseCategories();
    initialiseModal();
})