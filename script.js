const display = document.getElementById("display");
const history = document.getElementById("result");
const signArray = [];

const signs = document.querySelectorAll("[data-sign]");
signs.forEach(sign => signArray.push(sign.innerHTML));

const sign = op => {
    // -2 ker je na zadnjem mestu presledek
    if (history.value[history.value.length - 2] === op) {
        return op;
    }
}


const divisonByZero = () => {
    if (history.value === "Infinity") {
        history.value = "Can't divide by zero";
    }
}


const number_btn = document.querySelectorAll("[data-number]");
number_btn.forEach(number_btn => number_btn.addEventListener("click", function () {

    // stevilka ima lahko samo eno decimalno piko
    if (number_btn.innerHTML === "." && display.value.includes(".")) return;

    // dodaj spredaj nulo
    if (number_btn.innerHTML === "." && display.value === "") {
        display.value = "0" + display.value;
    }

    // združuje številke
    display.value += number_btn.innerHTML;

    // pogleda, če je na zadnjem mestu operator, drugače se displat reseta, če je vneseno število
    if (!signArray.some(sign)) {
        history.value = "";
    }

}));

const clear_entry = document.querySelector("[data-clearentry]");
clear_entry.addEventListener("click", function () {
    display.value = "";
})

const clear_btn = document.querySelector("[data-clear]");
clear_btn.addEventListener("click", function () {
    display.value = "";
    history.value = "";
})

const backspace = document.querySelector("[data-delete]");
backspace.addEventListener("click", function () {
    display.value = display.value.slice(0, -1);
})

const sign_btn = document.querySelectorAll("[data-sign]");
sign_btn.forEach(sign_btn => sign_btn.addEventListener("click", function () {

    if (display.value !== "" || !signArray.some(sign) && history.value !== "Can't divide by zero") {
        if (history.value === "" && display.value === "") {
            history.value = "0";
        }
        history.value += display.value + " " + sign_btn.innerHTML + " ";
        display.value = "";
    }

}));

const equals = document.querySelector("[data-equals]");
equals.addEventListener("click", function () {
    history.value += display.value;
    display.value = "";
    history.value = eval(history.value);
    divisonByZero();
})

const negate = document.querySelector("[data-negate]");
negate.addEventListener("click", function () {

    if (display.value[1] !== "-" && display.value !== "") {
        display.value = "(-" + display.value + ")"
    } else {
        display.value = display.value.slice(2, display.value.length - 1);
    }

})

const operator_btn = document.querySelectorAll("[data-operator]");
operator_btn.forEach(operator => operator.addEventListener("click", function () {
    switch (operator.innerHTML) {
        case "√":
            if (display.value !== "") {
                history.value = Math.sqrt(parseFloat(display.value));
                display.value = "";
            }
            break;
        case "x²":
            if (display.value !== "") {
                history.value = Math.pow(parseFloat(display.value), 2);
                display.value = "";
            }
            break;
        case "1/x":
            if (display.value !== "") {
                history.value = 1 / parseFloat(display.value);
                display.value = "";
                divisonByZero();
            }
            break;
    }
}))
