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
    // variable holding the elements with class name type - these are the category buttons in word area
    let types = document.getElementsByClassName("type");
    // iterate and listen for click, on click check the innerHTML, to determine word type to get, if not verb or adjective, exit
    for (let type of types) {
        type.addEventListener('click', function () {
            let wordType = this.innerHTML;
            if (wordType === "verb") {
                console.log('get a verb'); //replace with function to get verb and start game
            } else if (wordType === "adjective") {
                console.log('get an adjective'); //replace with function to get adjective and start game
            } else {
                return;
            }
        })
    }
})
