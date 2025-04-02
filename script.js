// List of greetings in different languages
const greetings = [
  "Welcome",
  "ようこそ",
  "Bienvenue",
  "欢迎",
  "Bienvenido",
  "أهلا بك",
  "Willkommen",
  "Добро пожаловать",
  "स्वागत है",
];

const greetingElement = document.getElementById("greetings");
const welcomeElement = document.getElementById("welcome");

// Animation configuration
const initialDelay = 550;
const fastDelay = 100;
const finalDelay = 200;

function calculateDelay(index, total) {
  if (index === 0) {
      return initialDelay;
  } else if (index === total - 1) {
      return finalDelay;
  } else {
      return fastDelay;
  }
}

async function playGreetings() {
  for (let i = 0; i < greetings.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      greetingElement.textContent = greetings[i];
      greetingElement.style.opacity = "1";
      const delay = calculateDelay(i, greetings.length);
      await new Promise(resolve => setTimeout(resolve, delay));
  }
  await new Promise(resolve => setTimeout(resolve, 300));
}

async function startGreetingAnimation() {
  await playGreetings();
  welcomeElement.classList.add("slide-up");
  await new Promise(resolve => setTimeout(resolve, 100));
  document.getElementById("main-content").style.display = "block";
  document.getElementById("left-section").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", () => {
  startGreetingAnimation();
});

const projectDivs = document.querySelectorAll("#left-section div");
const projectCards = document.getElementById("project-cards");

projectDivs.forEach(div => {
  div.addEventListener("mouseover", () => {
      const cardId = div.dataset.card;
      const card = document.getElementById(cardId);

      if (card) {
          document.querySelectorAll(".project-card").forEach(c => {
              c.style.display = "none";
          });

          projectCards.style.display = "block";
          card.style.display = "block";

          let closeButton = card.querySelector(".close-button");
          if (!closeButton) {
              closeButton = document.createElement("span");
              closeButton.classList.add("close-button");
              closeButton.innerHTML = "&times;";
              card.querySelector("h2").appendChild(closeButton);

              closeButton.addEventListener("click", () => {
                  card.style.display = "none";
                  projectCards.style.display = "none";
              });
          } else {
              closeButton.onclick = () => {
                  card.style.display = "none";
                  projectCards.style.display = "none";
              };
          }
      }
  });
});