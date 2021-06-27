/**
 * get the firstname from sessionStorage (from contact form) and display it in form success message
 */
function showStoredName() {
    document.getElementById("show-name").textContent = window.sessionStorage.getItem("name");
}

//when DOM has loaded, run the showStoredName function
document.addEventListener("DOMContentLoaded", function () {
    showStoredName();
});