let displayFontStage = 0;

document.getElementById("displayContainer").style.width = document.getElementById("calculator").clientWidth - 30;


function AdjustFontSize() {
    const containerWidth = document.getElementById("displayContainer").clientWidth;
    if (display.clientWidth > containerWidth - 21) {
        if (displayFontStage < 2) {
            displayFontStage ++;
        } else { Backspace(); }
    }
    if ((display.clientWidth < containerWidth * 0.61
            && displayFontStage === 1)
        || (display.clientWidth < containerWidth * 0.66
            && displayFontStage === 2)) {
        displayFontStage --;
    }
    if (displayFontStage === 0) { display.style.fontSize = "40px" }
    if (displayFontStage === 1) { display.style.fontSize = "25px" }
    if (displayFontStage === 2) { display.style.fontSize = "17px" }
    if (display.clientHeight >= 50) { Backspace(); }
    console.log("Container width:",containerWidth,"Text width:",display.clientWidth,"Font size:",displayFontStage);
}

function handleDisplayChange(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            AdjustFontSize();
        }
    }
}
const observer = new MutationObserver(handleDisplayChange);
const config = { childList: true, subtree: true };
observer.observe(display, config);


document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (keyMap.hasOwnProperty(key)) {
        event.preventDefault();

        if (key === ",") { document.getElementById("btn.").classList.add('active'); }
        else { document.getElementById("btn"+key).classList.add('active'); }
    }
});


// Deactivate buttons when the key is not pressed
document.addEventListener("keyup", function(event) {
    const key = event.key;
    if (keyMap.hasOwnProperty(key)) {
        if (key === ",") { document.getElementById("btn.").classList.remove('active'); }
        else { document.getElementById("btn"+key).classList.remove("active"); }
    }

    // Make sure shift keys are deactivated
    else if (key === "Shift") {
        const shiftKeys = ["*","/","(",")","^"];
        for (i in shiftKeys) {
            document.getElementById("btn"+shiftKeys[i]).classList.remove("active");
            console.log(shiftKeys[i]);
        }
    }
});