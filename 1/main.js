const keywords = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit."];

const employmentButton = document.querySelector("#employment-button");
const employmentButtonText = document.querySelector("#employment-button-text");
const templateText = employmentButtonText.innerText;

let employmentButtonClicks = 0;

function updateEmploymentButtonText() {
    employmentButtonText.innerText = templateText.replace("{employmentButtonClicks}", employmentButtonClicks);
}

function updateHider(clickable, contentHidden) {
    if (contentHidden) {
        clickable.classList.remove("fa-eye-slash");
        clickable.classList.add("fa-eye");
    } else {
        clickable.classList.remove("fa-eye");
        clickable.classList.add("fa-eye-slash");
    }
}

window.addEventListener("DOMContentLoaded", (x) => {
    employmentButton.addEventListener("click", (x) => {
        employmentButtonClicks++
        updateEmploymentButtonText();
    });
    updateEmploymentButtonText();

    document.querySelectorAll("[hidable-by]").forEach((element) => {
        const clickableId = element.getAttribute("hidable-by");
        const clickable = document.getElementById(clickableId);
        clickable.addEventListener("click", () => {
            const hidden = element.classList.toggle("hide");
            updateHider(clickable, hidden);
        });
        clickable.classList.add("fas");
        updateHider(clickable, element.classList.contains("hide"));

        element.addEventListener("transitionstart", (x) => {
            if (element.classList.contains("hide-complete")) {
                element.classList.remove("hide-complete");
            }
        });
        element.addEventListener("transitionend", (x) => {
            if (element.classList.contains("hide")) {
                element.classList.toggle("hide-complete");
            }
        });
    })

    const keywordsList = document.querySelector("#keywords");
    keywords.map(x => {
        const element = document.createElement("li");
        element.innerText = x;
        return element;
    }).forEach(x => keywordsList.appendChild(x));
});