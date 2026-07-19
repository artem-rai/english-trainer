const DATA_URL = new URL("../../data/phrases.json", import.meta.url);

let data = null;

async function loadData() {
    if (data) {
        return data;
    }

    const response = await fetch(DATA_URL);

    if (!response.ok) {
        throw new Error(`Failed to load phrases (${response.status})`);
    }

    data = await response.json();

    if (!Array.isArray(data.categories)) {
        throw new Error("Invalid phrases.json format");
    }

    return data;
}

export async function getCategories() {
    const data = await loadData();
    return data.categories;
}

export async function getCategory(id) {
    const categories = await getCategories();

    return categories.find(category => category.id === id);
}

export async function loadPhrases(categoryId) {
    const category = await getCategory(categoryId);

    if (!category) {
        throw new Error(`Category "${categoryId}" not found`);
    }

    return category.phrases;
}