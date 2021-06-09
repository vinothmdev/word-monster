//open modal
const open = document.getElementById("instructions-open")
//close modal
const close = document.getElementById("close-modal")

// on click of Instructions button, get the instructions-modal el and add visible class to it
open.addEventListener("click", function() {
    document.getElementById("instructions-modal").classList.add("visible");
    //add focus to close button so user can press enter to close
    close.focus();
});

// on click of close button, remove the visible class from modal
close.addEventListener("click", function() {
    document.getElementById("instructions-modal").classList.remove("visible");
});

// to close the modal if user clicks anywhere on window
window.onclick = function(event) {
    if (event.target == document.querySelector(".modal.visible")) {
        document.querySelector(".modal.visible").classList.remove("visible");
    }
}

//when DOM has loaded, listen for button click on Adjective/Verb buttons to start game
document.addEventListener("DOMContentLoaded", function () {
    // variable holding html collection of elements with class name type - these are the category buttons in word area
    let types = document.getElementsByClassName("type");
    // iterate and listen for click, on click check the innerHTML, to determine word type
    for (let type of types) {
        type.addEventListener('click', function () {
            let wordType = this.innerHTML;
            startGame(wordType);
            //add hidden class to the div holding these two buttons (verb and adjective)
            this.parentElement.classList.add("hidden");
            this.parentElement.previousElementSibling.classList.add("hidden");
        })
    }
})

/**
 * start game - get word by type, show blank spaces for word, show hint button, hide wordtype buttons and intro text.
 * @param {*verb or adjective} wordType 
 */
function startGame(wordType) {
    if (wordType === "verb") { //change to ternary conditional?
        console.log('get a verb'); //replace with function to get random verb to guess
    } else if (wordType === 'adjective') {
        console.log('get an adjective'); //replace with function to get random adj to guess
    } else {
        return; //if wordType is not either of these, exit
    }
    //show the div with text and hint button, show category
    document.getElementById("word-area-in-play").classList.remove("hidden");
    document.getElementById("category").innerText = `${wordType}`;
    //show the words boxes - equal to length of the chosen word
    //put focus on first keyboard item for convenience for keyboard users
    document.getElementsByClassName("key")[0].focus();
}