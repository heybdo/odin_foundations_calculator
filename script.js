const buttons = document.querySelectorAll('button');
const num1Display = document.querySelector('#num1');
const num2Display = document.querySelector('#num2');
const operatorDisplay = document.querySelector('#operator');
const equalDisplay = document.querySelector('#equal');
const resultDisplay = document.querySelector('#result');

let num1op = 0;
let num2op = 0;
let operator = "";

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate (operator, num1, num2) {
    if (operator === "+") {
        equalDisplay.textContent = "=";
        result = Math.round(add(num1,num2) * 10000) / 10000;
        resultDisplay.textContent = result;
    } else if (operator === "-") {
        equalDisplay.textContent = "=";
        result = Math.round(subtract(num1,num2) * 10000) / 10000;
        resultDisplay.textContent = result;
    } else if (operator === "*") {
        equalDisplay.textContent = "=";
        result = Math.round(multiply(num1,num2) * 10000) / 10000;
        resultDisplay.textContent = result;
    } else if (operator === "/") {
        if (num2op === 0) {
            clear();
            equalDisplay.textContent = "Howdy you, trying to divide by zero?";
        } else {
        equalDisplay.textContent = "=";
        result = Math.round(divide(num1,num2) * 10000) / 10000;
        resultDisplay.textContent = result;
        }
    }
}

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
	    let target = event.target;
	    if(target.id === "clear") {
            clear();
        } else if (target.classList.contains('digit')) {
            checkNums(target);
	    } else if (target.classList.contains('operator')) {
            if(num1Display.textContent === "") return;
            else {
                operatorSign(target);
            };
        } else if(target.classList.contains('enter')) {
            operate(operatorDisplay.textContent, num1op, num2op);
        } else if(target.classList.contains('decimal')) {
            addDecimal(target);
        } else if(target.id === 'backspace') {
            backspace();
        }
    });
});

function checkNums (target) {
    if (!operatorDisplay.textContent) {
        if (num1Display.textContent === "0") return;
        else {
            num1Display.textContent += target.textContent;
            num1op = parseFloat(num1Display.textContent);
        }
    } else {
        num2Display.textContent += target.textContent;
        num2op = parseFloat(num2Display.textContent);
    };
}

function clear () {
    num1.textContent = '';
    num2.textContent = '';
    operatorDisplay.textContent = '';
    equalDisplay.textContent = '';
    resultDisplay.textContent = '';
}

function operatorSign (target) {
    operator = target.textContent;
    operatorDisplay.textContent = operator;
}

function addDecimal (target) {
    if (!operatorDisplay.textContent) {
        if(num1Display.textContent.includes('.')) return;
        else {
            num1Display.textContent += target.textContent;
        };
    } else if (num2Display.textContent.includes('.')) return; 
        else {
        num2Display.textContent += target.textContent;
    };
}

function backspace () {
    if(num2Display.textContent) {
        num2Display.textContent = num2Display.textContent.slice(0,-1);
        num2op = parseFloat(num2Display.textContent);
    } else if (operatorDisplay.textContent) {
        operatorDisplay.textContent = "";
    } else if  (num1Display.textContent) {
        num1Display.textContent = num1Display.textContent.slice(0,-1);
        num1op = parseFloat(num1Display.textContent);
    }
}

function simulateButtonClickById(buttonId) {
    buttons.forEach(button => {
        if(button.id === buttonId) {
            button.click();
        }
    })
};

document.addEventListener('keydown', (e) => {
    let buttonId = e.key;
    simulateButtonClickById(buttonId);
})