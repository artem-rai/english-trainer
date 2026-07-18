export async function loadPhrases() {

    const response = await fetch("data/phrases.json");

    if (!response.ok) {
        throw new Error("Не удалось загрузить phrases.json");
    }

    return await response.json();

}