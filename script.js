const body = document.body;
const moodFace = document.getElementById("moodFace");
const moodText = document.getElementById("moodText");
const subtext = document.getElementById("subtext");
const statusLine = document.getElementById("statusLine");
const successNote = document.getElementById("successNote");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonStage = document.getElementById("buttonStage");

const furiousFaces = ["😡", "😤", "🤨", "🔥"];
let runCount = 0;
let isAccepted = false;

function setFuriousMood() {
  body.classList.remove("love-mode");
  body.classList.add("furious-mode");
  moodFace.textContent = furiousFaces[runCount % furiousFaces.length];
  moodText.textContent = "NOPE. You can't select no. The button has entered survival mode.";
  subtext.textContent =
    "Every attempt to reject this masterpiece only makes the page more dramatic, more fiery, and more suspicious.";
  statusLine.textContent = ["Nice try.", "Too slow.", "No button says no to no.", "Absolutely not."][runCount % 4];
}

function moveNoButton() {
  if (isAccepted) return;

  const stageRect = buttonStage.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 8;
  const maxLeft = stageRect.width - btnRect.width - padding;
  const maxTop = stageRect.height - btnRect.height - padding;

  const nextLeft = Math.max(padding, Math.floor(Math.random() * maxLeft));
  const nextTop = Math.max(padding, Math.floor(Math.random() * maxTop));

  noBtn.classList.add("is-running");
  noBtn.style.left = `${nextLeft}px`;
  noBtn.style.top = `${nextTop}px`;
  noBtn.style.transform = `rotate(${Math.random() * 14 - 7}deg)`;

  runCount += 1;
  setFuriousMood();
}

function acceptLove() {
  isAccepted = true;
  body.classList.remove("furious-mode");
  body.classList.add("love-mode");
  moodFace.textContent = "🥰";
  moodText.textContent = "Correct answer detected. Heart systems fully operational.";
  subtext.textContent =
    "This is now an official yes-zone. Romance levels restored. Dramatic objections have been permanently disabled.";
  statusLine.textContent = "Request approved: maximum love, minimum hesitation.";
  successNote.classList.remove("hidden");
  noBtn.classList.add("hidden");
  yesBtn.textContent = "Yay, she said yes!";
}

["mouseenter", "pointerenter", "touchstart", "focus"].forEach((eventName) => {
  noBtn.addEventListener(eventName, moveNoButton, { passive: true });
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", acceptLove);

window.addEventListener("resize", () => {
  if (isAccepted) return;
  noBtn.style.left = "";
  noBtn.style.top = "";
  noBtn.style.transform = "";
});
