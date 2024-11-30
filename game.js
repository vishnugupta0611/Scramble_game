import { wordsarr } from "./data.js";
console.log(wordsarr)
let score = parseInt(localStorage.getItem('score')) || 0; // Use parseInt to ensure it's treated as a number

let input = document.querySelector("#input");
let button = document.querySelector(".button");
let ques = document.querySelector(".ques");
let submit = document.querySelector("#submit");
let random;
let arrword;
let scramble;


function updateScore(newScore) {
    score = newScore;
    localStorage.setItem('score', score); 
    document.getElementById("score").textContent = score; // Update the displayed score
    

    const scoreBox = document.getElementById("scoreBox");
    scoreBox.style.animation = "none";  
    scoreBox.offsetHeight; 
    scoreBox.style.animation = "fadeIn 0.5s ease-out forwards"; // Reapply animation
}

button.addEventListener('click', () => {
    button.style.display = "none"; 
    submit.style.display = "inline-block"; 
    random = Math.floor(Math.random() * wordsarr.length); // Pick a random word
    arrword = wordsarr[random]; // Get the original word
    scramble = scramblewords(arrword.split("")); // Scramble the word
    ques.innerHTML = `<p class="para">Scramble this word</p> <p id="scramble">${scramble}</p>`;
    input.value = ""; // Clear input field
});

submit.addEventListener('click', () => {
    button.style.display = "inline-block"; 
    submit.style.display = "none";
    let value = input.value.trim(); 

    if (value.toLowerCase() === arrword.toLowerCase()) {
        console.log("Correct");
       
       ques.innerHTML = `<p class="para">Your answer is correct! Click on "Guess" to continue</p>`
        input.value = '';
        score += 1;
        updateScore(score); 
    } else {
        if (score > 0) {
            score -= 1;
            updateScore(score); 
        }
        console.log(arrword)
         ques.innerHTML = `<p class="para">Your answer is wrong !! try on another puzzle  !! <span class="ans"> ans is ${" "} ${arrword}</span></p>`
        console.log("Wrong");
    }
});

function scramblewords(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let ranindex = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[ranindex];
        arr[ranindex] = temp;
    }
    return arr.join("");
}
