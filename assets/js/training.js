import { checkAnswer } from "./checker.js";
import { showCategoryMenu } from "./categoryMenu.js";

const TRAINING_SIZE = 10;

export function startTraining(app, categories, goHome) {

    let phrases = [];
    let trainingPhrases = [];
    let currentCategory = null;

    let currentIndex = 0;
    let score = 0;

    renderCategories();

    function renderCategories() {

        showCategoryMenu({

            app,

            title: "Training",

            subtitle: "Choose a category",

            categories,

            onBack: goHome,

            onSelect: selectCategory

        });

    }

    function selectCategory(categoryId) {

        currentCategory = categories.find(
            category => category.id === categoryId
        );

        if (!currentCategory) {
            return;
        }

        phrases = currentCategory.phrases;

        if (phrases.length === 0) {
            renderEmptyCategory();
            return;
        }

        trainingPhrases = getRandomPhrases(
            phrases,
            TRAINING_SIZE
        );

        currentIndex = 0;
        score = 0;

        renderQuestion();

    }

    function renderEmptyCategory() {

        app.innerHTML = `

            <section class="page">

                <button
                    class="btn btn--secondary"
                    id="back-button">

                    ← Back

                </button>

                <header class="home__header">

                    <h1 class="title">

                        ${currentCategory.icon} ${currentCategory.title}

                    </h1>

                    <p class="subtitle">

                        No phrases in this category yet.

                    </p>

                </header>

            </section>

        `;

        document
            .querySelector("#back-button")
            .addEventListener("click", renderCategories);

    }

    function renderQuestion() {

        const phrase = trainingPhrases[currentIndex];

        app.innerHTML = `

            <section class="page training">

                <button
                    class="btn btn--secondary"
                    id="back-button">

                    ← Back

                </button>

                <div class="progress">

                    ${createProgress()}

                </div>

                <article class="card">

                    <h2 class="title">
                        Translate
                    </h2>

                    <div class="training__question">

                        ${phrase.source}

                    </div>

                    <input
                        id="answer-input"
                        class="input training__answer"
                        type="text"
                        placeholder="Enter translation..."
                        autocomplete="off">

                    <div class="actions">

                        <button
                            class="btn btn--primary"
                            id="check-button">

                            Check

                        </button>

                    </div>

                    <div
                        id="feedback"
                        class="mt-2"></div>

                </article>

            </section>

        `;

        bindEvents();

        document
            .querySelector("#answer-input")
            .focus();

    }

    function bindEvents() {

        document
            .querySelector("#back-button")
            .addEventListener("click", renderCategories);

        document
            .querySelector("#check-button")
            .addEventListener("click", checkCurrentAnswer);

        document
            .querySelector("#answer-input")
            .addEventListener("keydown", event => {

                if (event.key === "Enter") {
                    checkCurrentAnswer();
                }

            });

    }

    function checkCurrentAnswer() {

        const phrase = trainingPhrases[currentIndex];

        const input = document.querySelector("#answer-input");
        const feedback = document.querySelector("#feedback");

        const answer = input.value.trim();

        if (!answer) {
            input.focus();
            return;
        }

        const correct = checkAnswer(
            answer,
            phrase.answers
        );

        if (correct) {

            score++;

            feedback.innerHTML = `
                <div class="alert alert--success">
                    ✅ Correct!
                </div>
            `;

        } else {

            feedback.innerHTML = `
                <div class="alert alert--error">
                    ❌ Correct answer:
                    <strong>${phrase.answers.join(" / ")}</strong>
                </div>
            `;

        }

        input.disabled = true;

        document
            .querySelector("#check-button")
            .disabled = true;

        setTimeout(nextQuestion, 1200);

    }

    function nextQuestion() {

        currentIndex++;

        if (currentIndex >= trainingPhrases.length) {

            renderResult();

            return;

        }

        renderQuestion();

    }

    function renderResult() {

        const percent = Math.round(
            score / trainingPhrases.length * 100
        );

        app.innerHTML = `

            <section class="page result">

                <div class="result__emoji">

                    🎉

                </div>

                <h2>

                    Training completed

                </h2>

                <div class="result__score">

                    ${score} / ${trainingPhrases.length}

                </div>

                <p class="result__text">

                    ${percent}% correct

                </p>

                <div class="actions">

                    <button
                        class="btn btn--primary"
                        id="restart-button">

                        Train again

                    </button>

                    <button
                        class="btn btn--secondary"
                        id="categories-button">

                        Categories

                    </button>

                    <button
                        class="btn btn--secondary"
                        id="home-button">

                        Home

                    </button>

                </div>

            </section>

        `;

        document
            .querySelector("#restart-button")
            .addEventListener("click", () => {
                selectCategory(currentCategory.id);
            });

        document
            .querySelector("#categories-button")
            .addEventListener("click", renderCategories);

        document
            .querySelector("#home-button")
            .addEventListener("click", goHome);

    }

    function createProgress() {

        return trainingPhrases
            .map((_, index) => {

                const active =
                    index <= currentIndex
                        ? "active"
                        : "";

                return `
                    <div class="progress__item ${active}">
                    </div>
                `;

            })
            .join("");

    }

}

function getRandomPhrases(phrases, count) {

    const shuffled = [...phrases]
        .sort(() => Math.random() - 0.5);

    return shuffled.slice(
        0,
        Math.min(count, phrases.length)
    );

}
   