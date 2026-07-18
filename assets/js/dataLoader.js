const DATA_URL = new URL("../../data/phrases.json", import.meta.url);

export async function loadPhrases() {

    const response = await fetch(DATA_URL);

    if (!response.ok) {
        throw new Error(`Failed to load phrases (${response.status})`);
    }

    const phrases = await response.json();

    if (!Array.isArray(phrases)) {
        throw new Error("Invalid phrases.json format");
    }

    return phrases;

}