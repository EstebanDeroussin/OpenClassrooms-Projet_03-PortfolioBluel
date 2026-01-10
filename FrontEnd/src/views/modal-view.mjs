// Gestion modale (ouvrir/fermer, afficher contenu, formulaire)
export function renderModal() {
	const edit_btn = document.querySelector(".edit-works .edit-btn");
	const overlay = document.getElementById("overlay");
	const delete_modal = document.querySelector(".delete-work");
	const close_btn = document.querySelector(".close-modal");
	const add_btn = document.querySelector(".delete-work .add-work button");
	const add_modal = document.querySelector(".add-work-modal");
	const back_btn = document.querySelector(".back-modal");

	edit_btn.addEventListener("click", (e) => {
		e.preventDefault();
		overlay.classList.add("active");
		delete_modal.classList.add("active");
	});

	close_btn.addEventListener("click", () => {
		overlay.classList.remove("active");
		delete_modal.classList.remove("active");
		add_modal.classList.remove("active");
		back_btn.classList.remove("active");
	});

	add_btn.addEventListener("click", () => {
		delete_modal.classList.remove("active");
		add_modal.classList.add("active");
		back_btn.classList.add("active");
	});

	back_btn.addEventListener("click", () => {
		add_modal.classList.remove("active");
		delete_modal.classList.add("active");
		back_btn.classList.remove("active");
    });

    const overlay_container = document.querySelector(".overlay-container");
	console.log(overlay_container);

	overlay.onclick = closeModal;
	overlay_container.onclick = stopPropagation;
}

function stopPropagation(event) {
	event.stopPropagation();
}

function closeModal() {
	console.log("toto");
}



export function renderModalWorks(works) {
	const modal_works = document.querySelector(".works-container");
	modal_works.innerHTML = "";
	works.forEach((work) => {
		const work_element = document.createElement("div");
		work_element.dataset.id = work.id;
		work_element.classList.add("work");

		const img_element = document.createElement("img");
		img_element.src = work.imageUrl;

		const trash_element = document.createElement("div");
		trash_element.classList.add("trash");

        const trash_img = document.createElement("img");
        trash_img.classList.add("trash-img")
		trash_img.src = "./assets/images/trash.png";
		trash_element.dataset.id = work.id;

		trash_element.appendChild(trash_img);
		modal_works.appendChild(work_element);
		work_element.appendChild(img_element);
		work_element.appendChild(trash_element);
	});
}

export function renderModalCategoryOptions(categorys) {
	const category_input = document.getElementById("work-category");
	category_input.innerHTML = "";
	console.log(category_input);

	categorys.forEach((category) => {
		const select_element = document.createElement("option");
		select_element.value = category.id;
		select_element.innerText = category.name;

		category_input.appendChild(select_element);
	});
}
