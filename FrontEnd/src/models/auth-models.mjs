import { LOGIN_URL } from "./api-utils.mjs";

// Gestion authentification (login, logout, vérification token)
export async function fetchAuth(email, password) {
	try {
		const response = await fetch(LOGIN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: data.message || "Erreur d'authentification",
			};
		}

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
