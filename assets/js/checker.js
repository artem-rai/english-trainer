export function checkAnswer(userAnswer, answers) {

    const normalizedUser = normalize(userAnswer);

    return answers.some(answer =>
        normalize(answer) === normalizedUser
    );

}

function normalize(text) {

    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

}