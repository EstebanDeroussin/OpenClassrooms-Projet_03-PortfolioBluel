import { WORKS_URL } from "./api-utils.mjs";

// Logique spécifique à la modale (si nécessaire)
export async function fetchWorkDelete(id, token) {
	const url = `http://localhost:5678/api/works/${id}`;

	const options = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const response = await fetch(url, options);

		if (response.ok) {
			console.log(`L'objet avec l'ID ${id} a été supprimé avec succès.`);
			return true;
		} else {
			throw new Error(
				`Échec de la suppression : ${response.status} ${response.statusText}`
			);
		}
	} catch (error) {
		console.error("Erreur lors de la suppression de l'objet");
	}
}

export async function fetchAddWork(image, title, category, token) {
	const url = WORKS_URL;
	const formData = new FormData();

	formData.append("image", image);
	formData.append("title", title);
	formData.append("category", category);

	const options = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	};

	try {
		// 5. Effectuer la requête
		const response = await fetch(url, options);

		// 6. Gérer la réponse de l'API
		if (response.ok) {
			console.log("Projet posté avec succès.");
		} else {
			// Tenter de récupérer les détails de l'erreur si l'API envoie un corps JSON
			const errorDetails = await response.json();
			console.error("Échec de la publication :", errorDetails);
			throw new Error(
				`Erreur lors de la création du projet : ${response.status} ${response.statusText}`
			);
		}
	} catch (error) {
		console.error("Erreur réseau ou traitement :", error.message);
		throw error;
	}
}
