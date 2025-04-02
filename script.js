// List of greetings in different languages
const greetings = [ // Creates an array named 'greetings' to hold greeting messages
    "Welcome",         // English greeting
    "ようこそ",         // Japanese greeting
    "Bienvenue",       // French greeting
    "欢迎",            // Chinese greeting
    "Bienvenido",      // Spanish greeting
    "أهلا بك",        // Arabic greeting
    "Willkommen",      // German greeting
    "Добро пожаловать", // Russian greeting
    "स्वागत है",        // Hindi greeting
];

const greetingElement = document.getElementById("greetings"); // Gets the HTML element with the id 'greetings'
const welcomeElement = document.getElementById("welcome"); // Gets the HTML element with the id 'welcome'

// Animation configuration
const initialDelay = 550;      // Delay (milliseconds) for the first greeting (longer delay)
const fastDelay = 100;        // Delay (milliseconds) for the middle greetings (faster delay)
const finalDelay = 200;        // Delay (milliseconds) for the last greeting (moderate delay)

// Improved easing function for sudden acceleration and sudden halt effect
function calculateDelay(index, total) { // Function to determine the delay based on the greeting's index
    // First element is slow
    if (index === 0) { // If it's the first greeting
        return initialDelay; // Return the initial delay
    }
    // Last element has the sudden halt
    else if (index === total - 1) { // If it's the last greeting
        return finalDelay; // Return the final delay
    }
    // All middle elements are fast (sudden acceleration)
    else { // For all other greetings
        return fastDelay; // Return the fast delay
    }
}

// Function to play greetings with dynamic timing
async function playGreetings() { // An asynchronous function to play the greetings
    
    for (let i = 0; i < greetings.length; i++) { // Loop through the greetings array
       
        await new Promise(resolve => setTimeout(resolve, 50)); // Wait 50 milliseconds before updating the text.
        
        // Update text and fade in
        greetingElement.textContent = greetings[i]; // Change the text of the greeting element
        greetingElement.style.opacity = "1"; // Make the greeting visible
        
        // Wait according to our dynamic timing function
        const delay = calculateDelay(i, greetings.length); // Get the delay for the current greeting
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the calculated delay
    }
    
    // Extra pause on the final greeting
    await new Promise(resolve => setTimeout(resolve, 300)); // Wait 300 milliseconds after the last greeting
}

// Function to handle greeting animation and transition
async function startGreetingAnimation() {
    await playGreetings();

    // Slide up the welcome screen
    welcomeElement.classList.add("slide-up");

    // Wait for the slide-up animation to complete
    await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay to match CSS transition

    // Make the main content and left-section visible
    document.getElementById("main-content").style.display = "block";
    document.getElementById("left-section").style.display = "flex"; // Or whatever display property you need (block, grid, etc.)
}

// Initialize animation on page load
document.addEventListener("DOMContentLoaded", () => {
    // Initially hide the main content
    document.getElementById("main-content").style.display = "none";
    startGreetingAnimation();
});

const projectDivs = document.querySelectorAll("#left-section div");
const projectCards = document.getElementById("project-cards");

projectDivs.forEach(div => {
  div.addEventListener("mouseover", () => {
    const cardId = div.dataset.card;
    const card = document.getElementById(cardId);

    if (card) {
      // Close any currently open card
      document.querySelectorAll(".project-card").forEach(c => {
        c.style.display = "none";
      });

      // Display the selected card
      projectCards.style.display = "block";
      card.style.display = "block";

      // Ensure close button exists and attach event listener (once)
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
        // If close button exists, re-attach click listener (to ensure correct card is closed)
        closeButton.onclick = () => {
          card.style.display = "none";
          projectCards.style.display = "none";
        };
      }
    }
  });
});

