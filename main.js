let quote = "about above add after again air all almost along also always America an and animal another answer any are around as ask at away back be because been before began begin being below between big book both boy but by call came can car carry change children city close come could country cut day did different do does don't down each earth eat end enough even every example eye face family far father feet few find first follow food for form found four from get girl give go good got great group grow had hand hard has have he head hear help her here high him his home house how idea if important in Indian into is it its it's just keep kind know land large last later learn leave left let letter life light like line list little live long look made make man many may me mean men might mile miss more most mother mountain move much must my name near need never new next night no not now number of off often oil old on once one only open or other our out over own page paper part people picture place plant play point put question quick quickly quite read really right river run said same saw say school sea second see seem sentence set she should show side small so some something sometimes song soon sound spell start state still stop story study such take talk tell than that the their them then there these they thing think this those thought three through time to together too took tree try turn two under until up us use very walk want was watch water way we well went were what when where which while white who why will with without word work world would write year you young your above add after again air all almost along also always America an and animal another answer any are around as ask at away back be because been before began begin being below between big book both boy but by call came can car carry change children city close come could country cut day did different do does don't down each earth eat end enough even every example eye face family far father feet few find first follow food for form found four from get girl give go good got great group grow had hand hard has have he head hear help her here high him his home house how idea if important in Indian into is it its it's just keep kind know land large last later learn leave left let letter life light like line list little live long look made make man many may me mean men might mile miss more most mother mountain move much must my name near need never new next night no not now number of off often oil old on once one only open or other our out over own page paper part people picture place plant play point put question quick quickly quite read really right river run said same saw say school sea second see seem sentence set she should show side small so some something sometimes song soon sound spell start state still stop story study such take talk tell than that the their them then there these they thing think this those thought three through time to together too took tree try turn two under until up us use very walk want was watch water way we well went were what when where which while white who why will with without word work world would write year you young your";
let wordList = quote.split(" ");
console.log(wordList);


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

let sentIn = [];

shuffle(wordList);
console.log(wordList)
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



/*document.getElementById("tt").innerHTML = newWordList;*/
inputField.value = "";
inputField.focus();
inputField.disabled = false;

inputField.addEventListener("keypress", startFunc); 

let i = 0
let cor = 0;
let incr = 0;
let lengthOfIncorrect = 0;
let keysPressed = 0;
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

function compute(){
    let acc = Math.round(100-((incr/cor) * 100));
    let asString = sentIn.toString();
    console.log(asString)
    asString = asString.replace(/,/g, '');
    console.log(asString)
    let cpm = asString.length+spaces;
    let adjustedCpm = cpm - lengthOfIncorrect;
    let wpm = adjustedCpm / 5;
    wpm = Math.round(wpm);
    if(wpm <= 0){
        wpm = 0;
    }else if(acc <= 0){
        acc = 0;
    }
    /*let wpm = cpm/5;*/

    accDisp.innerHTML = acc + "%";
    wpmDisp.innerHTML = wpm;

}
function checkCorrect(char){
    keysPressed += 1;
    if(char.which == 32){
        checkIfaccurate();
        char.preventDefault();
        return false;
    }
    if(keysPressed > 120){
        keysPressed = 0;
        console.log("doing");
        const tsection = document.querySelector(".typing-section");
        const getStyle = getComputedStyle(tsection);
        let cur = getStyle.height;
        cur = Number(cur.replace("px", ""));
        if(cur < 500){
            cur = ((cur + 28.96875).toString())+"px";
            const currentHeight = tsection.style.height;
            tsection.style.height = cur;

        }
    }
}
function startFunc() {
    inputField.removeEventListener("keypress", startFunc);
    inputField.addEventListener("keypress", checkCorrect);
    let timer = 60000;
    let bottomInc = 60;
    var countdown = setInterval(function () {
        bottomInc--;
        csection.innerHTML = bottomInc;
        if (bottomInc <= 0) clearInterval(countdown);
    }, 1000);
    setTimeout(endFunc, timer);
}

function endFunc() {
    console.log("60 seconds are over");
    csection.innerHTML = "60";
    compute();
    inputField.disabled = true;
    inputField.value = "";
}
