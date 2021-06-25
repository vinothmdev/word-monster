/**
 * when submit event happens, run handleSubmit function
 */
function initialiseForm() {
    document.getElementById("contact-form").addEventListener("submit", handleSubmit);
}

/**
 * get the firstname from form, set it as sessionStorage item to be used by form success page, then submit form
 * @param {event} event submit
 */
function handleSubmit(event) {
    event.preventDefault();
    let name = document.getElementById("first-name");
    window.sessionStorage.setItem("name", name.value);
    document.getElementById("contact-form").submit();
}

//when DOM has loaded, listen for submit on the form
document.addEventListener("DOMContentLoaded", function () {
    initialiseForm();
})