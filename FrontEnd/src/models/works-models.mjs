// Gestion projets (récupération, filtres, ajout, suppression)

// import du ending point pour GET les works
import { CAT_URL, WORKS_URL } from "./api-utils.mjs";

export async function fetchWorks() {
	try {
		const response = await fetch(WORKS_URL);

		if (!response.ok) {
			return {
				success: false,
				error: "Impossible d'accéder aux données",
			};
		}

		const data = await response.json();
		return {
			success: true,
			data: data,
		};
	} catch (error) {
		return {
			success: false,
			error: "Erreur de connexion",
		};
	}
}

export async function fetchCategories() {
	try {
		const response = await fetch(CAT_URL);

		if (!response.ok) {
			return {
				success: false,
				error: "Impossible d'accéder aux filtres",
			};
		}

		const data = await response.json();
		return {
			success: true,
			data: data,
		};
	} catch {
		return {
			success: false,
			error: "Erreur de connexion",
		};
	}
}

export function filterWorks(works, categoryId) {
	if (categoryId === 0) return works;
    return works.filter((work) => {
        return work.category.id === categoryId
    });
}
