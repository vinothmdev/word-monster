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

