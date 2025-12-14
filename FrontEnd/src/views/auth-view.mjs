// Affichage/masquage éléments admin (bandeau, boutons, etc.)
export function showAdminFeatures() {
	const bandeau = document.querySelector(".bandeau");
	const header = document.querySelector(".header-content");
	const edit_btn = document.querySelector(".edit-btn");
	const logout_btn = document.querySelector(".logout");
	const login_btn = document.querySelector(".login-btn");
	const title = document.querySelector(".my-project");

	title.classList.remove("active");
	login_btn.classList.remove("active");
	bandeau.classList.add("active");
	header.classList.add("active");
	edit_btn.classList.add("active");
	logout_btn.classList.add("active");
}

export function hideAdminFeatures() {
	const bandeau = document.querySelector(".bandeau");
	const header = document.querySelector(".header-content");
	const edit_btn = document.querySelector(".edit-btn");
	const logout_btn = document.querySelector(".logout");
	const login_btn = document.querySelector(".login-btn");
	const title = document.querySelector(".my-project");

	title.classList.add("active");
	login_btn.classList.add("active");
	edit_btn.classList.remove("active");
	bandeau.classList.remove("active");
	header.classList.remove("active");
	logout_btn.classList.remove("active");
}
