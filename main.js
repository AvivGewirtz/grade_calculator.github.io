function run() {
    calculateGrade();
}

function calculateGrade() {
    var finalTestGrade = parseFloat(document.getElementById("TestGrade").value);
    var finalTestWeight = parseFloat(document.getElementById("TestWeight").value);

    if(!isValidTest(finalTestGrade, finalTestWeight))
        return;

    var assigmentsArr = [];
    for (var i = 1; i <= 10; i++) {
        var grade = parseFloat(document.getElementById("g" + i).value);
        var weight = parseFloat(document.getElementById("w" + i).value);
        
        if(validate(grade) && validate(weight) && grade > finalTestGrade) {
            let row = [grade, weight];
            assigmentsArr.push(row);
        }   
    }
    assigmentsArr.sort((a, b) => {
        return b[0] - a[0];
    });

    var finalScore = calcAverage(finalTestGrade, finalTestWeight, assigmentsArr);

    document.getElementById("result").textContent = finalScore.toFixed(0);
    document.getElementById("grade").textContent = "Grade:"
}

function isValidTest(finalTestGrade, finalTestWeight) {
    if(!validate(finalTestGrade)) {
        printError("Error, Grade should be between 0 to 100.");
        return false;
    }
    if(!validate(finalTestWeight)) {
        printError("Error, Weight should be between 0 to 100.");
        return false;
    }
    if(isNaN(finalTestGrade)|| isNaN(finalTestWeight)) {
        return false;
    }
    return true;
}

function validate(num) {
    return (num > 100 || num < 0) ? false : true;
}

function printError(message) {
    alert(message);
}

function calcAverage(finalTestGrade, finalTestWeight, assigmentsArr) {
    let assigmentScore = 0;
    let assigmentWeight = 0

    for(let i = 0; i < assigmentsArr.length; i++) {
        if(finalTestWeight + assigmentWeight + assigmentsArr[i][1] > 100)
            break;
        assigmentScore += assigmentsArr[i][0] * (assigmentsArr[i][1] / 100);
        assigmentWeight += assigmentsArr[i][1];
    }
    let weightDiff = 100 - finalTestWeight - assigmentWeight; 
    let testScore = finalTestGrade * ((finalTestWeight + weightDiff)/100)
    return round(testScore + assigmentScore);
}
function round(number) {
    let integerPart = Math.floor(number);
    let decimalPart = number - integerPart;

    if (decimalPart >= 0.5) {
        return Math.ceil(number);
    } else {
        return Math.floor(number);
    }
}

/* Dark Mode*/ 
function toggleDarkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    var elementsToChangeColor = document.querySelectorAll('.sector1, input[type="number"], table, th, td, button');

    elementsToChangeColor.forEach(function(elem) {
        elem.classList.toggle("dark-mode");
    });
}

document.getElementById("toggle").addEventListener("change", function() {
    toggleDarkMode();
});