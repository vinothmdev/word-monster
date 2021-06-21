/**
 * Get random word from array of Word Objects(word, type, hint, meaning) then run startGame
 * @param {string} wordCategory 
 */
function getWord(wordCategory) {

const words = [{
    word: "eat",
    type: "verb",
    hint: "if you are hungry, then ...",
    meaning: "to put or take (food) into the mouth, chew it and swallow it"
}, {
    word: "run",
    type: "verb",
    hint: "go quickly",
    meaning: "to move at a speed faster than a walk, never having both or all the feet on the ground at the same time"
}, {
    word: "make",
    type: "verb",
    hint: "create something",
    meaning: "to form (something) by putting parts together or combining substances; create"
}, {
    word: "have",
    type: "verb",
    hint: "to own something",
    meaning: "possess, own, or hold"
}, {
    word: "know",
    type: "verb",
    hint: "sounds like 'no'",
    meaning: "to have information in your mind, to be aware"
}, {
    word: "sleep",
    type: "verb",
    hint: "you would be very tired if you didn't do this!",
    meaning: "to be in the state of rest when your eyes are closed, your body is not active, and your mind is unconscious"
}, {
    word: "carry",
    type: "verb",
    hint: "... a bag",
    meaning: "to hold something or someone and transport it, him, or her from one place to another"
}, {
    word: "clean",
    type: "verb",
    hint: "for example, by washing or wiping",
    meaning: "to remove dirt from something"
}, {
    word: "draw",
    type: "verb",
    hint: "you might need a pencil and paper",
    meaning: "to make a picture of something or someone with a pencil or pen"
}, {
    word: "laugh",
    type: "verb",
    hint: "is something funny?",
    meaning: "to smile while making sounds with your voice that show you think something is funny or you are happy"
}, {
    word: "remember",
    type: "verb",
    hint: "don't forget!",
    meaning: "to be able to bring back a piece of information into your mind, or to keep a piece of information in your memory"
}, {
    word: "measure",
    type: "verb",
    hint: "how to find out how tall you are",
    meaning: "to discover the exact size or amount of something, or to be of a particular size"
}, {
    word: "understand",
    type: "verb",
    hint: "helps things make sense",
    meaning: "to know the meaning of something that someone says, to know why or how something happens or works"
}, {
    word: "believe",
    type: "verb",
    hint: "... in ghosts? Do you?",
    meaning: "to think that something is true, correct, or real"
}, {
    word: "exercise",
    type: "verb",
    hint: "running is an example",
    meaning: "to do physical activities to make your body strong and healthy"
}, {
    word: "practice",
    type: "verb",
    hint: "... makes perfect",
    meaning: "to do or play something regularly or repeatedly in order to become skilled at it"
}, {
    word: "learn",
    type: "verb",
    hint: "the main reason we go to school",
    meaning: "to get knowledge or skill in a new subject or activity"
}, {
    word: "open",
    type: "verb",
    hint: "the opposite of close",
    meaning: "move (a door or window) so as to leave a space allowing access and vision"
}, {
    word: "surprise",
    type: "verb",
    hint: "to astonish or startle someone",
    meaning: "come upon or take unawares; (of something unexpected) cause (someone) to feel mild astonishment or shock"
}, {
    word: "thought",
    type: "verb",
    hint: "past tense of think",
    meaning: "past tense of think, which means to believe something or have an opinion or idea"
}, {
    word: "salty",
    type: "adjective",
    hint: "popcorn and crisps can be described as this",
    meaning: "tasting of salt or containing a lot of salt"
}, {
    word: "empty",
    type: "adjective",
    hint: "the opposite of full",
    meaning: "not containing any things or people"
}, {
    word: "gentle",
    type: "adjective",
    hint: "not rough",
    meaning: "calm, kind, or soft; moderate in action, effect, or degree; not strong or violent"
}, {
    word: "important",
    type: "adjective",
    hint: "it's the number one priority!",
    meaning: "necessary or of great value; having great effect or influence"
}, {
    word: "beautiful",
    type: "adjective",
    hint: "very attractive",
    meaning: "very attractive, very pleasant, having beauty, possessing qualities that please the senses or mind aesthetically"
}, {
    word: "purple",
    type: "adjective",
    hint: "a colour, similar to violet",
    meaning: "of a dark reddish-blue colour"
}, {
    word: "square",
    type: "adjective",
    hint: "like a rectangle but all sides are the same length",
    meaning: "shaped like a square; forming a right angle, shaped more like a right angle than a curve"
}, {
    word: "quiet",
    type: "adjective",
    hint: "not loud!",
    meaning: "making very little noise; having little activity or excitement and few people"
}, {
    word: "interesting",
    type: "adjective",
    hint: "the opposite of boring",
    meaning: "Someone or something that is interesting keeps your attention because he, she, or it is unusual, exciting, or has a lot of ideas"
}, {
    word: "difficult",
    type: "adjective",
    hint: "hard, not easy",
    meaning: "needing skill or effort; not friendly, easy to deal with, or behaving well"
}, {
    word: "loud",
    type: "adjective",
    hint: "turn up the volume!",
    meaning: "making a lot of noise"
}, {
    word: "happy",
    type: "adjective",
    hint: "smiling and laughing",
    meaning: "feeling, showing, or causing pleasure or satisfaction"
}, {
    word: "common",
    type: "adjective",
    hint: "not rare",
    meaning: "the same in a lot of places or for a lot of people"
}, {
    word: "clever",
    type: "adjective",
    hint: "usually knows a lot",
    meaning: "having or showing the ability to learn and understand things quickly and easily"
}, {
    word: "young",
    type: "adjective",
    hint: "the opposite of old",
    meaning: "having lived or existed for only a short time and not old"
}, {
    word: "little",
    type: "adjective",
    hint: "small",
    meaning: "small in size or amount; young; not very important"
}, {
    word: "large",
    type: "adjective",
    hint: "the opposite of little",
    meaning: "big in size or amount, of more than average size or amount"
}, {
    word: "heavy",
    type: "adjective",
    hint: "weighs a ton!",
    meaning: "weighing a lot, and needing effort to move or lift; thick, strong, solid, or strongly made"
}, {
    word: "simple",
    type: "adjective",
    hint: "it's easy!",
    meaning: "easy to understand or do; not difficult; without decoration; plain"
}, {
    word: "yellow",
    type: "adjective",
    hint: "the third colour of a rainbow",
    meaning: "of a colour like that of a lemon or gold or the sun"
}];

let wordsByType = words.filter(word => word.type === wordCategory);
    //get a random word object from the wordsByType array 
    wordObject = wordsByType[Math.floor(Math.random() * wordsByType.length)];
    startGame(wordCategory);

}