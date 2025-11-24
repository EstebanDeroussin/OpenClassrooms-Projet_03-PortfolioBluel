import {
	fetchCategories,
	fetchWorks,
	filterWorks,
} from "../models/works-models.mjs";
import {
	renderCategories,
	renderWorks,
	setActiveFilter,
} from "../views/works-view.mjs";

// État : liste complète des works
let allWorks = [];

// Orchestration projets et filtres
export async function initWorks() {
	const result = await fetchWorks();

	if (result.success) {
		const works = result.data;
		renderWorks(works);
		allWorks = works;
	}
}

export async function initCategories() {
	const result = await fetchCategories();

	if (result.success) {
		const categories = result.data;
		categories.unshift({
			id: 0,
			name: "Tous",
		});
		renderCategories(categories);
	}
}

export function initFilterWorks() {
	const filter_btns = document.querySelectorAll(".filter-btn");
	setActiveFilter(0);

	filter_btns.forEach((filter) => {
		filter.addEventListener("click", (e) => {
			const clicked_btn = e.target;
			const clicked_id = Number(clicked_btn.dataset.id);

			const filtered = filterWorks(allWorks, clicked_id);
			renderWorks(filtered);
			setActiveFilter(clicked_id);
		});
	});
}
