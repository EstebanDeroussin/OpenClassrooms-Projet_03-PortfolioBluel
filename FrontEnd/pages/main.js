import { isUserLoggedIn } from "../src/controllers/auth-controller.mjs";
import { initModal } from "../src/controllers/modal-controller.mjs";
import {
	initCategories,
	initFilterWorks,
	initWorks,
} from "../src/controllers/works-controller.mjs";
import { fetchAuth } from "../src/models/auth-models.mjs";
import { fetchCategories } from "../src/models/works-models.mjs";

// Point d'entrée page principale
await initWorks();
await initCategories();
initFilterWorks();

isUserLoggedIn()

initModal()

