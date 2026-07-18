export function showViewer(app, phrases, goHome) {

    let currentIndex = 0;
    let translationVisible = false;

    render();

    function render() {

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

                        ${
            translationVisible
                ? "Hide translation"
                : "Show translation"
        }

                    </button>

                    <button
                        class="btn btn--secondary"
                        id="next-button">

                        Next →

                    </button>

                </div>

            </section>

        `;

        bindEvents();

    }

    function bindEvents() {

        document
            .querySelector("#back-button")
            .addEventListener("click", goHome);

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

        render();

    }

    function previousPhrase() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = phrases.length - 1;
        }

        translationVisible = false;

        render();

    }

    function nextPhrase() {

        currentIndex++;

        if (currentIndex >= phrases.length) {
            currentIndex = 0;
        }

        translationVisible = false;

        render();

    }

}