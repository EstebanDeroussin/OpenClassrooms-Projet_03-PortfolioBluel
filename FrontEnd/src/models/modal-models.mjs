import { WORKS_URL } from "./api-utils.mjs";

// Logique spécifique à la modale (si nécessaire)
export async function fetchWorkDelete(id, token) {
	const url = `${WORKS_URL}/${id}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		let error = new Error(response.message);
		error.name = `http error ${response.status} - ${response.statusText}`;
		throw error;
	}

	return {
		success: true,
	};
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
