import { showCategoryMenu } from "./categoryMenu.js";

export function showViewer(app, categories, goHome) {

    let phrases = [];
    let currentIndex = 0;
    let translationVisible = false;

    renderCategories();

    function renderCategories() {

        showCategoryMenu({

            app,

            title: "Browse phrases",

            subtitle: "Choose a category",

            categories,

            onBack: goHome,

            onSelect: selectCategory

        });

    }

    function selectCategory(categoryId) {

        const category = categories.find(item => item.id === categoryId);

        if (!category) {
            return;
        }

        phrases = category.phrases;
        currentIndex = 0;
        translationVisible = false;

        if (phrases.length === 0) {
            renderEmptyCategory(category);
            return;
        }

        renderViewer();

    }

    function renderEmptyCategory(category) {

        app.innerHTML = `

            <section class="page">

                <button
                    class="btn btn--secondary"
                    id="back-button">

                    ← Back

                </button>

                <header class="home__header">

                    <h1 class="title">
                        ${category.icon} ${category.title}
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

    function renderViewer() {

        const phrase = phrases[currentIndex];

        app.innerHTML = `

            <section class="page viewer">

                <button
                    class="btn btn--secondary"
                    id="back-button">

                    ← Back

                </button>

                <div class="badge">

                    ${currentIndex + 1} / ${phrases.length}

                </div>

                <article class="card phrase-card">

                    <div class="phrase">

                        ${phrase.source}

                    </div>

                    <div class="translation ${translationVisible ? "show" : ""}">

                        ${translationVisible ? phrase.answers[0] : ""}

                    </div>

                </article>

                <div class="actions">

                    <button
                        class="btn btn--secondary"
                        id="prev-button">

                        ← Previous

                    </button>

                    <button
                        class="btn btn--primary"
                        id="show-button">

                        ${translationVisible
            ? "Hide translation"
            : "Show translation"}

                    </button>

                    <button
                        class="btn btn--secondary"
                        id="next-button">

                        Next →

                    </button>

                </div>

            </section>

        `;

        bindViewerEvents();

    }

    function bindViewerEvents() {

        document
            .querySelector("#back-button")
            .addEventListener("click", renderCategories);

        document
            .querySelector("#show-button")
            .addEventListener("click", toggleTranslation);

        document
            .querySelector("#prev-button")
            .addEventListener("click", previousPhrase);

        document
            .querySelector("#next-button")
            .addEventListener("click", nextPhrase);

    }

    function toggleTranslation() {

        translationVisible = !translationVisible;

        renderViewer();

    }

    function previousPhrase() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = phrases.length - 1;
        }

        translationVisible = false;

        renderViewer();

    }

    function nextPhrase() {

        currentIndex++;

        if (currentIndex >= phrases.length) {
            currentIndex = 0;
        }

        translationVisible = false;

        renderViewer();

    }

}