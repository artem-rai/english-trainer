import { loadPhrases } from "./dataLoader.js";
import { showTraining } from "./training.js";
import { showViewer } from "./viewer.js";

const app = document.getElementById("app");
const menu = document.getElementById("menu");

const viewerBtn = document.getElementById("viewerBtn");
const trainingBtn = document.getElementById("trainingBtn");

let phrases = [];

function showMenu() {

    menu.style.display = "block";
    app.innerHTML = "";

}

async function init() {

    phrases = await loadPhrases();

}

viewerBtn.addEventListener("click", () => {

    showViewer(app, phrases);

});

trainingBtn.addEventListener("click", () => {

    showTraining(app, phrases);

});

init();