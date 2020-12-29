var quotesList = ["P1: I was just talking to joe. Do you know who joe is? P2: No, I don't. P1: Joe mama.",  
"Guys, have you heard of joe from fortnite? Joe mama.", 
"Bruh has occurred 204981509382 times. Are you sure? Yes.", 
"Once upon a time, there was a man named Joe. Now, ask who Joe is.", 
"They don't know that we know they know don't know we know they know do they know I don't know they know we know they know but they don't know that we know they know we know but they know that we know they know we know.",
"Many of life's failures are people who did not realize how close they were to success when they gave up.",
"Success usually comes to those who are too busy to be looking for it.",
"The question isn't who is going to let me; it's who is going to stop me.",
"It does not matter how slowly you go as long as you do not stop.", 
"First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.",
"Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So, throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover."];
var quote = quotesList[Math.floor(Math.random() * quotesList.length)];
console.log("quote: " + quote);
var nottest = false;
let wordList = quote.split(" ");

var sentIn = [];
for (var n = 0; n < wordList.length; n++) {
    let parent = document.getElementById("typing-text");
    let current = wordList[n];
    let newElem = document.createElement("SPAN");
    console.log(newElem);
    newElem.setAttribute("id", "corpus");
    newElem.setAttribute("class", "corpus");
    newElem.innerHTML = current + " ";
    parent.appendChild(newElem);
}

let newWordList = wordList.toString();
newWordList = newWordList.replace(/,/g, ' ')
const inputField = document.getElementById("input-field");
const accDisp = document.getElementById("Accuracy");
const wpmDisp = document.getElementById("WPM");
const tsection = document.querySelector(".text-content");
// countdown below
const csection = document.getElementById("Countdown");

inputField.value = "";
inputField.focus();
inputField.disabled = false;

inputField.addEventListener("keypress", times);

var bottomInc = 0;
function times(){
    inputField.removeEventListener("keypress", times);
    inputField.addEventListener("keypress", checkCorrect);

    let timer = 0;
    
    var countdown = setInterval(function () {
        bottomInc++;
        d = bottomInc
        csection.innerHTML = bottomInc;
        if (nottest) clearInterval(countdown);
    }, 1000);
}

let i = 0
let cor = 0;
let incr = 0;
let lengthOfIncorrect = 0;
let keysPressed = 0;
let wordsTyped = 0;
var nodes = document.getElementById("typing-text").children;
console.log(nodes)
let spaces = 0
function checkIfaccurate(){
    if(inputField.value == wordList[i]){
        // Correct color
        nodes[i].style.color = '#33b8b8';
        cor += 1;
        //console.log(inputField.value.length)
        keysPressed += 1;
        
    } else {
        // Incorrect color
        lengthOfIncorrect += wordList[i].length + 1;
        console.log(lengthOfIncorrect)
        nodes[i].style.color = "#FF2D00";
        incr += 1;
        keysPressed += 1;
        

    }
    spaces += 1
    i += 1;
    sentIn.push(inputField.value);
    console.log(inputField.value)
    inputField.value = "";
    inputField.value.replace(/\s+/g, '');
}

function checkCorrect(char){
    keysPressed += 1;
    if(char.which == 32){
        wordsTyped++;
        console.log(wordsTyped);
        console.log(wordList.length);
        checkIfaccurate();
        char.preventDefault();
        if (wordsTyped === wordList.length) {
            console.log("test completed")
            nottest = true;
            endTest();
        }
        return false;
    }
    
}
function compute(){
    let acc = Math.round(100-((incr/cor) * 100));
    let asString = sentIn.toString();
    console.log(asString)
    asString = asString.replace(/,/g, '');
    console.log(asString);
    let cpm = asString.length+spaces;
    let adjustedCpm = cpm - lengthOfIncorrect;
    let wpm = (((adjustedCpm) / 5) / ((bottomInc) / 60) * 100) / 100;
    wpm = Math.round(wpm);
    if(wpm <= 0){
        wpm = 0;
    }if(acc <= 0){
        acc = 0;
    }
    /*let wpm = cpm/5;*/

    accDisp.innerHTML = acc + "%";
    wpmDisp.innerHTML = wpm;

}
function endTest() {
    compute();
    inputField.disabled = true;
    inputField.value = "";
}
