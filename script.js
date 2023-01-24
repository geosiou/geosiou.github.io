
const newGuess = document.querySelector("#new-guess");
const message = document.querySelector("#message");
const lowHigh = document.querySelector("#low-high");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const root = document.querySelector(":root");

// Ορισμός σχετικών χειριστών συμβάντων
newGuess.addEventListener("keyup", checkKey); // Πάτημα πλήκτρου
checkButton.addEventListener("click", checkGuess); // Κλικ στο κουμπί "'Ελεγχος"
restartButton.addEventListener("click", restart); // Κλικ στο κουμπί "Παίξε ξανά"

let previousGuesses = [];
let theGuess;
window.onload = newRandom();
newGuess.focus();

function newRandom(){
    theGuess = Math.floor(Math.random()*100+1);
    //console.log(`Μυστικός: ${theGuess}`); //Εκτύπωση αριθμού στην κονσόλα για έλεγχο/δοκιμές
}

function checkKey(e){
    if (e.code === "Enter" || e.code === "NumpadEnter"){ // Έλεγχος και για το «Enter» του αριθμητικού πληκτρολογίου
        checkGuess();
    }
}

function checkGuess(){
    let result=processGuess(newGuess.value);
    if (result === "win" || result === "lost") {
        checkButton.style.visibility = "hidden"; // Απόκρυψη κουμπιού "Έλεγχος"
        restartButton.style.visibility="visible"; // Εμφάνιση κουμπιού "Παίξε ξανά"
        newGuess.disabled = true; // Απαγόρευση εισαγωγής νέου αριθμού
    }
    else {
        newGuess.focus();
    }
}

function processGuess(newValue){
    let newNum = parseInt(newValue);
    newGuess.value = ""; // Άδειασμα input
    if (isNaN(newNum)) {
        message.style.backgroundColor= "var(--msg-wrong-color)";
        message.textContent="Δώσε αριθμό!";
    }
    else {
        previousGuesses.push(newNum);
        lowHigh.textContent="Προηγούμενες προσπάθειες: "+previousGuesses.join(' ');
        if (newNum == theGuess) {
            message.style.backgroundColor="var(--msg-win-color)";
            message.textContent="Μπράβο το βρήκες!";
            if (newNum > 65) {
                message.textContent="Μπράβο το βρήκες! Ασφαλτοστρώσεις ήταν; Δεν γλιτώνουμε..."
            }
            else if (newNum <= 15) {
                message.textContent="Μπράβο το βρήκες! Φτιαγμένη η δουλειά..."
            }
            else if (newNum > 15 && newNum <= 35) {
                message.textContent="Μπράβο το βρήκες! Τυχερός ήταν!"
            }
            return "win";
        }
        else if (previousGuesses.length == 10) {
            message.style.backgroundColor="var(--msg-wrong-color)";
            message.textContent="Έχασες!";
            return "lost";
        }
        else {
            message.style.backgroundColor="var(--msg-wrong-color)";
            message.textContent="Λάθος, " + ((newNum < theGuess) ? "είσαι πιο χαμηλά" : "το ξεπέρασες");
        }
    }
}

function restart(){
    previousGuesses = []; // Αρχικοποίηση/καθαρισμός λίστας από προηγούμενες προσπάθειες
    newRandom(); // Εύρεση νέου μυστικού αριθμού
    message.textContent=""; // Καθαρισμός μηνύματος τέλους παιχνιδιού
    lowHigh.textContent=""; // Καθαρισμός μηνύματος προηγούμενων προσπαθειών
    checkButton.style.visibility = "visible"; // Επανεμφάνιση κουμπιού "Έλεγχος"
    restartButton.style.visibility="hidden"; //Εξαφάνιση κουμπιού "Παίξε ξανά"
    newGuess.disabled = false; // Άρση απαγόρευσης εισαγωγής νέου αριθμού
    newGuess.focus(); // Εστίαση στο input
}
