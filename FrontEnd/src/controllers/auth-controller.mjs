import { fetchAuth } from "../models/auth-models.mjs";
import { hideAdminFeatures, showAdminFeatures } from "../views/auth-view.mjs";

// Orchestration authentification
export async function initAuth() {
	const login_form = document.getElementById("login-form");

	login_form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const errorDiv = document.querySelector(".error-login");

		// Cacher l'erreur précédente
		errorDiv.classList.remove("active");

		// const result = await fetchAuth(email, password);

		// if (result.success) {
		// 	localStorage.setItem("token", result.data.token);
		// 	window.location.href = "/index.html";
		// } else {
		// 	errorDiv.classList.add("active");
		// }

		fetchAuth(email, password)
			.then((result) => {
				localStorage.setItem("token", result.data.token);
				window.location.href = "/index.html";
			})
			.catch((error) => {
				console.error(error.name);
				errorDiv.classList.add("active");
			});
	});
}

export function isUserLoggedIn() {
	const token = localStorage.getItem("token");
	console.log(token);

	if (token) {
		showAdminFeatures();
	} else {
		hideAdminFeatures();
	}

	const logout_btn = document.querySelector(".logout");
	logout_btn.addEventListener("click", () => {
		localStorage.removeItem("token");
	});
}
