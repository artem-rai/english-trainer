import { getCategories } from "./dataLoader.js";
import { showViewer } from "./viewer.js";
import { startTraining } from "./training.js";

const app = document.querySelector("#app");

let categories = [];

async function init() {

    try {

        categories = await getCategories();

        showHome();

    } catch (error) {

        console.error(error);

        app.innerHTML = `
            <section class="card">

                <h2 class="title">
                    Loading error
                </h2>

                <p class="subtitle">
                    Unable to load phrases.
                </p>

            </section>
        `;

    }

}

function showHome() {

    app.innerHTML = `

        <section class="page">

            <header class="home__header">

                <h1 class="title">
                    English Trainer
                </h1>

                <p class="subtitle">
                    Learn English phrases every day.
                </p>

            </header>

            <article
                class="card card--interactive card--menu home__card"
                id="viewer-card">

                <h2>
                    📖 Browse phrases
                </h2>

                <p>
                    View all available phrases and translations.
                </p>

            </article>

            <article
                class="card card--interactive card--menu home__card"
                id="training-card">

                <h2>
                    🎯 Training
                </h2>

                <p>
                    Practice translations and test yourself.
                </p>

            </article>

        </section>

    `;

    document
        .querySelector("#viewer-card")
        .addEventListener("click", openViewer);

    document
        .querySelector("#training-card")
        .addEventListener("click", openTraining);

}

function openViewer() {

    showViewer(app, categories, showHome);

}

function openTraining() {

    startTraining(app, categories, showHome);

}

init();