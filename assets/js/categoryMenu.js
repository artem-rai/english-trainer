export function showCategoryMenu({
                                     app,
                                     title,
                                     subtitle,
                                     categories,
                                     onBack,
                                     onSelect
                                 }) {

    app.innerHTML = `

        <section class="page">

            <button
                class="btn btn--secondary"
                id="back-button">

                ← Back

            </button>

            <header class="home__header">

                <h1 class="title">

                    ${title}

                </h1>

                <p class="subtitle">

                    ${subtitle}

                </p>

            </header>

            <div class="category-list">

                ${categories.map(category => `

                    <article
                        class="card card--interactive card--menu category-card"
                        data-id="${category.id}">

                        <h2>

                            ${category.icon} ${category.title}

                        </h2>

                        <p>

                            ${category.phrases.length}
                            phrase${category.phrases.length === 1 ? "" : "s"}

                        </p>

                    </article>

                `).join("")}

            </div>

        </section>

    `;

    document
        .querySelector("#back-button")
        .addEventListener("click", onBack);

    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                onSelect(card.dataset.id);

            });

        });

}