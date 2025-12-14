// Orchestration modale (ajout/suppression projets)

import { fetchAddWork, fetchWorkDelete } from "../models/modal-models.mjs";
import { fetchCategories, fetchWorks } from "../models/works-models.mjs";
import {
	renderModal,
	renderModalCategoryOptions,
	renderModalWorks,
} from "../views/modal-view.mjs";
import { renderWorks } from "../views/works-view.mjs";

export async function initModal() {
	renderModal();

	const resultat = await fetchWorks();
	const works = resultat.data;

	renderModalWorks(works);

	const token = localStorage.getItem("token");

	const worksContainer = document.querySelector(".works-container");
	worksContainer.addEventListener("click", async (e) => {
		//const trashBtn = e.target
		//const trash_id = trashBtn.dataset.id;
		const work = e.target.closest(".work");
		const id = work.dataset.id;

		fetchWorkDelete(id, token)
			.then(() => {
				let index = works.findIndex((work) => work.id === id);
				works.splice(index, 1);
				work.remove();
				renderWorks(works);
			})
			.catch((error) => console.log(error));

		//fetchWorkDelete(work_id, token);
		//const resultat = await fetchWorks();
		//const works_deleted = resultat.data;
		//renderModalWorks(works_deleted);
	});

	const findCategorie = await fetchCategories();
	const categories = findCategorie.data;
	console.log(categories);

	renderModalCategoryOptions(categories);

	const upload_form = document.getElementById("add-work-form");
	const fileInput = document.getElementById("photo-input");
	const previewImage = document.getElementById("preview-image");
	const uploadIcon = document.querySelector(".upload-icon");
	const uploadBtn = document.querySelector(".upload-btn");
	const uploadInfo = document.querySelector(".upload-info");

	// Fonction pour réinitialiser l'affichage de la zone d'upload
	function resetUploadZone() {
		previewImage.style.display = "none";
		previewImage.src = "";
		uploadIcon.style.display = "block";
		uploadBtn.style.display = "block";
		uploadInfo.style.display = "block";
	}

	// Afficher l'image sélectionnée
	fileInput.addEventListener("change", (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				// Afficher l'image preview
				previewImage.src = event.target.result;
				previewImage.style.display = "block";
				previewImage.style.width = "200px";

				// Masquer les éléments par défaut
				uploadIcon.style.display = "none";
				uploadInfo.style.display = "none";
			};

			reader.onerror = () => {
				console.error("Erreur lors de la lecture du fichier");
			};

			reader.readAsDataURL(file);
		} else {
			// Si aucun fichier, réinitialiser l'affichage
			resetUploadZone();
		}
	});

	upload_form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const image = fileInput.files[0];
		const title = document.getElementById("work-title").value;
		const category = document.getElementById("work-category").value;

		try {
			await fetchAddWork(image, title, category, token);

			// Réactualiser la liste des works
			const resultat = await fetchWorks();
			const works_updated = resultat.data;

			// Re-render dans la modale
			renderModalWorks(works_updated);

			// Re-render sur la page principale
			renderWorks(works_updated);

			// Réinitialiser le formulaire
			upload_form.reset();
			// Réinitialiser l'affichage de la zone d'upload
			resetUploadZone();
		} catch (error) {
			console.error("Erreur lors de l'ajout du projet :", error);
		}
	});
}
