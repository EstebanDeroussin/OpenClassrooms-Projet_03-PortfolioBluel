// Affichage projets et filtres dans la galerie
export function renderWorks(works) {
	const works_container = document.querySelector(".gallery");
	works_container.innerHTML = "";

	works.forEach((work) => {
		const card_element = document.createElement("figure");

		const img_element = document.createElement("img");
		img_element.src = work.imageUrl;

		const title_element = document.createElement("figcaption");
		title_element.innerText = work.title;

		works_container.appendChild(card_element);
		card_element.appendChild(img_element);
		card_element.appendChild(title_element);
	});
}

export function renderCategories(categories) {
	const categories_container = document.querySelector(".filters");
	categories_container.innerHTML = "";

	categories.forEach((category) => {
		const btn = document.createElement("button");
		btn.classList.add("filter-btn");
		btn.dataset.id = category.id;
		btn.innerText = category.name;

		categories_container.appendChild(btn);
	});
}

export function setActiveFilter(activeCategoryId) {
	// Récupérer tous les boutons de filtre
	const filterButtons = document.querySelectorAll(".filter-btn");

	// Retirer la classe active de tous les boutons
	filterButtons.forEach((btn) => {
		btn.classList.remove("active");
	});

	// Trouver et activer le bouton correspondant au categoryId
	if (activeCategoryId !== undefined && activeCategoryId !== null) {
		const activeButton = Array.from(filterButtons).find(
			(btn) => btn.dataset.id === String(activeCategoryId)
		);

		if (activeButton) {
			activeButton.classList.add("active");
		}
	}
}
