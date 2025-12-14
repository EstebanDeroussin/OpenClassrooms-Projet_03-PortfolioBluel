import { LOGIN_URL } from "./api-utils.mjs";

// Gestion authentification (login, logout, vérification token)
// export async function fetchAuth(email, password) {
// 	try {
// 		const response = await fetch(LOGIN_URL, {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				email: email,
// 				password: password,
// 			}),
// 		});

// 		const data = await response.json();

// 		if (!response.ok) {
// 			return {
// 				success: false,
// 				error: data.message || "Erreur d'authentification",
// 			};
// 		}

// 		return {
// 			success: true,
// 			data: data,
// 		};
// 	} catch (error) {
// 		return {
// 			success: false,
// 			error: "Erreur de connexion",
// 		};
// 	}
// }

export async function fetchAuth(email, password) {
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
	//throw c'est pour soulever une éxeption c'est une erreur et l'erreur c'est celle que je crée (erreur personalisée)
	if (!response.ok) {
		let error = new Error(response.message);
		error.name = `http error ${response.status} - ${response.statusText}`;
		throw error;
	}

	return {
		success: true,
		data: data,
	};
}
