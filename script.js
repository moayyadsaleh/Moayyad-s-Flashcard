document.addEventListener("DOMContentLoaded", function () {
  const flashcardContainer = document.getElementById("flashcard-container");
  const wordInput = document.getElementById("wordInput");
  const meaningInput = document.getElementById("meaningInput");
  const exampleInput = document.getElementById("exampleInput");
  const addButton = document.getElementById("addButton");

  // Load flash cards from local storage
  loadFlashCards();

  addButton.addEventListener("click", function () {
    const word = wordInput.value.trim();
    const meaning = meaningInput.value.trim();
    const example = exampleInput.value.trim();

    if (word === "" || meaning === "" || example === "") {
      alert("Please enter both word/phrase, meaning, and example");
      return;
    }

    const flashcardCount = flashcardContainer.children.length + 1;
    const flashcard = createFlashCard(flashcardCount, word, meaning, example);
    flashcardContainer.appendChild(flashcard);

    // Save flash cards to local storage
    saveFlashCards();

    // Clear input fields
    wordInput.value = "";
    meaningInput.value = "";
    exampleInput.value = "";
  });

  function createFlashCard(number, word, meaning, example) {
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

    const numberElement = document.createElement("span");
    numberElement.classList.add("flashcard-number");
    numberElement.textContent = number + ". ";

    const wordElement = document.createElement("h2");
    wordElement.textContent = word;

    const meaningElement = document.createElement("p");
    meaningElement.textContent = meaning;

    const exampleElement = document.createElement("p");
    exampleElement.textContent = "Example: " + example;

    flashcard.appendChild(deleteButton);
    flashcard.appendChild(numberElement);
    flashcard.appendChild(wordElement);
    flashcard.appendChild(meaningElement);
    flashcard.appendChild(exampleElement);

    return flashcard;
  }

  function saveFlashCards() {
    const flashcards = [];
    const flashcardElements = flashcardContainer.querySelectorAll(".flashcard");

    flashcardElements.forEach(function (flashcardElement, index) {
      const number = index + 1;
      const word = flashcardElement.querySelector("h2").textContent;
      const meaning = flashcardElement.querySelectorAll("p")[0].textContent;
      const example = flashcardElement
        .querySelectorAll("p")[1]
        .textContent.split(": ")[1];
      flashcards.push({ number, word, meaning, example });
    });

    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }

  function loadFlashCards() {
    const flashcards = JSON.parse(localStorage.getItem("flashcards"));

    if (flashcards) {
      flashcards.forEach(function (flashcard) {
        const newFlashcard = createFlashCard(
          flashcard.number,
          flashcard.word,
          flashcard.meaning,
          flashcard.example
        );
        flashcardContainer.appendChild(newFlashcard);
      });
    }
  }
});
