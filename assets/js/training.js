import { checkTranslation } from "./checker.js";

let currentIndex = 0;
let answered = false;

export function showTraining(container, phrases) {

    currentIndex = 0;
    answered = false;

    render(container, phrases);

}

function render(container, phrases) {

    const phrase = phrases[currentIndex];

    container.innerHTML = `
        <h2>Тест</h2>

        <p><strong>Фраза ${currentIndex + 1} из ${phrases.length}</strong></p>

        <div class="card">

            <h3>${phrase.source}</h3>

            <input
                id="answerInput"
                type="text"
                placeholder="Введите перевод"
                autocomplete="off"
            >

            <button id="checkBtn">
                Проверить
            </button>

            <div id="result"></div>

        </div>
    `;

    const elements = {

        input: document.getElementById("answerInput"),
        button: document.getElementById("checkBtn"),
        result: document.getElementById("result")

    };

    bindEvents(container, phrases, elements);

}

function bindEvents(container, phrases, elements) {

    elements.input.focus();

    elements.button.addEventListener("click", () => {

        handleAction(container, phrases, elements);

    });

    elements.input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            handleAction(container, phrases, elements);

        }

    });

}

function handleAction(container, phrases, elements) {

    if (answered) {

        nextQuestion(container, phrases);

    } else {

        checkAnswer(phrases, elements);

    }

}

function checkAnswer(phrases, elements) {

    const phrase = phrases[currentIndex];

    const isCorrect = checkTranslation(

        elements.input.value,
        phrase.answers

    );

    answered = true;

    elements.input.disabled = true;

    if (isCorrect) {

        elements.result.innerHTML = `
            <p class="correct">
                ✅ Верно!
            </p>
        `;

    } else {

        elements.result.innerHTML = `
            <p class="wrong">
                ❌ Неверно
            </p>

            <p>
                Правильные ответы:
                <br>
                ${phrase.answers.join("<br>")}
            </p>
        `;

    }

    elements.button.textContent = "Следующая";

}

function nextQuestion(container, phrases) {

    currentIndex++;

    answered = false;

    if (currentIndex >= phrases.length) {

        currentIndex = 0;

    }

    render(container, phrases);

}

   