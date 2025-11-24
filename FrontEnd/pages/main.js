import {
	initCategories,
	initFilterWorks,
	initWorks,
} from "../src/controllers/works-controller.mjs";

// Point d'entrée page principale
await initWorks();
await initCategories();
initFilterWorks();
