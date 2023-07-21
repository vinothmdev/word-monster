/* this file is used by index.html to get the random word by category when the category is chosen 
from the initialiseCategories function in script.js and the getWord function is called.
There is only one function in this file and all the words for the game are held in the const below.
const words is outside of the getWord function so that it is not initialised each time the function is called
Split out from script.js for readability */

//array of word objects, each one has word, type, hint and meaning
const words = [{
    word: "உன்",
    type: "verb",
    hint: "if you are hungry, then ...",
    meaning: "to put or take (food) into the mouth, chew it and swallow it"
}, ];

/**
 * Return random word by category from array of Word Objects(word, type, hint, meaning) 
 * @param {string} wordCategory Verb or Adjective
 */
function getWord(wordCategory) {
    // filter the words array into a new array, by the chosen category
    let wordsByType = words.filter(word => word.type === wordCategory);
    //get a random word object from the wordsByType array, pass this to startGame function 
    let wordObject = wordsByType[Math.floor(Math.random() * wordsByType.length)];
    return wordObject;
}