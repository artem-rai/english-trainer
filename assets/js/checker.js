export function checkTranslation(userAnswer, answers) {

    const normalizedAnswer = normalize(userAnswer);

    return answers.some(answer => {
        return normalize(answer) === normalizedAnswer;
    });

}

function normalize(text) {

    return text
        .trim()
        .toLowerCase()
        .replace(/ё/g, "е")
        .replace(/[.,!?;:()"']/g, "")
        .replace(/\s+/g, " ");

}