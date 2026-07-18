let currentIndex = 0;
let translationVisible = false;

export function showViewer(container, phrases) {

    currentIndex = 0;
    translationVisible = false;

    render(container, phrases);

}

function render(container, phrases) {

    const phrase = phrases[currentIndex];

    container.innerHTML = `
        <h2>Просмотр фраз</h2>

        <div class="viewer-navigation">

            <button id="prevBtn">⬅</button>

            <span>${currentIndex + 1} / ${phrases.length}</span>

            <button id="nextBtn">➡</button>

        </div>

        <div class="card">

            <h3>${phrase.source}</h3>

            <hr>

            <div id="translationCard" class="translation-card">

                ${
        translationVisible
            ? phrase.answers.join("<br>")
            : `
                            <div class="hidden-text">
                                👁<br>
                                Нажмите, чтобы показать перевод
                            </div>
                        `
    }

            </div>

        </div>
    `;

    bindEvents(container, phrases);

}

function bindEvents(container, phrases) {

    document.getElementById("prevBtn")
        .addEventListener("click", () => {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = phrases.length - 1;
            }

            translationVisible = false;

            render(container, phrases);

        });

    document.getElementById("nextBtn")
        .addEventListener("click", () => {

            currentIndex++;

            if (currentIndex >= phrases.length) {
                currentIndex = 0;
            }

            translationVisible = false;

            render(container, phrases);

        });

    document
        .getElementById("translationCard")
        .addEventListener("click", () => {

            translationVisible = !translationVisible;

            render(container, phrases);

        });

}