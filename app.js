const RANDOM_SENTENCE_URL_API = "https://api.chucknorris.io/jokes/random";

const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("type-Input");
const timer = document.getElementById("timer");
const DEFAULT_TIMER = 3;

typeInput.addEventListener("input", () => {
  console.log("Hello");
  const sentenceArray = typeDisplay.querySelectorAll("span");
  const arrayValue = typeInput.value.split("");
  sentenceArray.forEach((character, index) => {
    if (arrayValue[index] === undefined) {
      character.classList.remove("correct");
      character.classList.remove("incorrect");
    } else {
      if (character.innerText === arrayValue[index]) {
        character.classList.add("correct");
        character.classList.remove("incorrect");
      } else {
        character.classList.add("incorrect");
        character.classList.remove("correct");
      }
    }
  });
});

const getRandomSentence = async () => {
  typeDisplay.innerText = "";
  return await fetch(RANDOM_SENTENCE_URL_API, { mode: "cors" })
    .then((response) => response.json())
    .then((data) => data.value);
};

async function RenderNextSentence() {
  const sentence = await getRandomSentence();
  let oneText = sentence.split("");

  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    typeDisplay.appendChild(characterSpan);
  });

  typeInput.value = null;
  // StartTimer();
}

let startTime;
let originTime = 3;
/* カウントアップを開始する。 */
function StartTimer() {
  timer.innerText = originTime;
  startTime = new Date(); /* 現在の時刻を表示 */
  console.log(startTime);
  setInterval(() => {
    timer.innerText = originTime - getTimerTime(); /* １秒ずれて呼び出される */
    if (timer.innerText <= 0) TimeUp();
  }, 1000);
}

function getTimerTime() {
  return Math.floor(
    (new Date() - startTime) / 1000
  ); /* 現在の時刻 - １秒前の時刻 = 1s*/
}

function TimeUp() {
  RenderNextSentence();
}

RenderNextSentence();
