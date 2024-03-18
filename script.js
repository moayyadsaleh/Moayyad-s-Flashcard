document.addEventListener("DOMContentLoaded", function () {
  const flashcardContainer = document.getElementById("flashcard-container");
  const wordInput = document.getElementById("wordInput");
  const meaningInput = document.getElementById("meaningInput");
  const addButton = document.getElementById("addButton");

  // Load flash cards from local storage
  loadFlashCards();

  addButton.addEventListener("click", function () {
    const word = wordInput.value.trim();
    const meaning = meaningInput.value.trim();

    if (word === "" || meaning === "") {
      alert("Please enter both word/phrase and meaning");
      return;
    }

    const flashcard = createFlashCard(word, meaning);
    flashcardContainer.appendChild(flashcard);

    // Save flash cards to local storage
    saveFlashCards();

    // Clear input fields
    wordInput.value = "";
    meaningInput.value = "";
  });

  function createFlashCard(word, meaning) {
    const flashcard = document.createElement("div");
    flashcard.classList.add("flashcard");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      flashcard.remove();
      // Save flash cards to local storage after deletion
      saveFlashCards();
    });

    const wordElement = document.createElement("h2");
    wordElement.textContent = word;

    const meaningElement = document.createElement("p");
    meaningElement.textContent = meaning;

    flashcard.appendChild(deleteButton);
    flashcard.appendChild(wordElement);
    flashcard.appendChild(meaningElement);

    return flashcard;
  }

  function saveFlashCards() {
    const flashcards = [];
    const flashcardElements = flashcardContainer.querySelectorAll(".flashcard");

    flashcardElements.forEach(function (flashcardElement) {
      const word = flashcardElement.querySelector("h2").textContent;
      const meaning = flashcardElement.querySelector("p").textContent;
      flashcards.push({ word, meaning });
    });

    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }

  function loadFlashCards() {
    const flashcards = JSON.parse(localStorage.getItem("flashcards"));

    if (flashcards) {
      flashcards.forEach(function (flashcard) {
        const newFlashcard = createFlashCard(flashcard.word, flashcard.meaning);
        flashcardContainer.appendChild(newFlashcard);
      });
    }
  }
});
