let piAdded = false;
const display = document.getElementById("display");
var CopiedMemory

function isDecimalAllowed() {
    const displayText = display.textContent.trim();
    const lastOperatorIndex = Math.max(
        displayText.lastIndexOf("+"),
        displayText.lastIndexOf("-"),
        displayText.lastIndexOf("*"),
        displayText.lastIndexOf("/")
    );
    if (lastOperatorIndex === -1 || displayText.length === 0) {
        return !displayText.includes(".");
    }
    const textAfterLastOperator = displayText.substring(lastOperatorIndex);
    return !textAfterLastOperator.includes(".");
}

function AddNumber(Number) {
    ClearError();
    if (Number === "PI" && isDecimalAllowed()) {
        display.textContent += 3.14;
    } else if (Number !== "PI") {
        display.textContent += Number;
    }
}

function AddOperator(Operator) {
    ClearError();
    const displayText = display.textContent.trim();
    piAdded = false
    if (displayText !== "" || Operator == "-") {
        const lastChar = displayText.charAt(displayText.length - 1);

        if (lastChar !== "/" && lastChar !== "*" && lastChar !== "-" && lastChar !== "+") {
            if (Operator == "/") {
                display.textContent += " / ";
            } else if (Operator == "*") {
                display.textContent += " * ";
            } else if (Operator == "-") {
                display.textContent += " - ";
            } else if (Operator == "+") {
                display.textContent += " + ";
            }
        }
    }
}


function AddDecimal() {
    const displayText = display.textContent.trim();

    if (isDecimalAllowed()) {
        ClearError();
        display.textContent += "."
    }
}

function Calculate() {
    const displayText = display.textContent.trim();

    if (displayText.length > 0) {
        try {
            const result = eval(displayText);
            if (isNaN(result)) {
                throw new Error("Division By Zero");
            } else if (!isFinite(result)) {
                throw new Error("Invalid Calculation");
            }
            display.textContent = result
        } catch (error) {
            // Handle errors here
            if (error instanceof SyntaxError) {
                display.textContent = "Syntax Error";
            } else {
                display.textContent = error.message;
            }
        }
    }
}

function Clear() {
    ClearError();
    display.textContent = "";
    piAdded = false; // Reset piAdded when clearing
}

function Backspace() {
    ClearError();
    let displayText = display.textContent;

    if (displayText.length > 0) {
        if (displayText.charAt(displayText.length - 1) === " ") {
            displayText = displayText.substring(0, displayText.length - 3);
        } else {
            displayText = displayText.substring(0, displayText.length - 1);
        }

        display.textContent = displayText;
        piAdded = false; // Reset piAdded when using backspace
    }
}

function ClearError() {
    const errorMessages = ["Error", "Division By Zero", "Invalid Calculation", "Syntax Error", "Is Not A Function"];
    const displayText = display.textContent.toLowerCase();

    if (errorMessages.some(errorMessage => displayText.includes(errorMessage.toLowerCase()))) {
        display.textContent = "";f
    }
}

function CopyMemory() {
    CopiedMemory = display.textContent;
}

function PasteMemory() {
    if (CopiedMemory != undefined) {
        display.textContent += CopiedMemory;
    } 
}





const keyMap = {
    "0": "AddNumber(0)",
    "1": "AddNumber(1)",
    "2": "AddNumber(2)",
    "3": "AddNumber(3)",
    "4": "AddNumber(4)",
    "5": "AddNumber(5)",
    "6": "AddNumber(6)",
    "7": "AddNumber(7)",
    "8": "AddNumber(8)",
    "9": "AddNumber(9)",
    "+": "AddOperator('+')",
    "-": "AddOperator('-')",
    "*": "AddOperator('*')",
    "/": "AddOperator('/')",
    ".": "AddDecimal()",
    ",": "AddDecimal()",
    "Enter": "Calculate()",
    "Backspace": "Backspace()",
    "Escape": "Clear()",
    "(": "AddNumber('(')",
    ")": "AddNumber(')')",
    "p": "AddNumber('PI')"
};


document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (keyMap.hasOwnProperty(key)) {
        const calculatorFunction = keyMap[key];
        if (!(key === "Enter" && display.textContent === "Error")) {
            eval(calculatorFunction);
        }
        event.preventDefault();
    }
});
