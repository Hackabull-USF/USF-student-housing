$(document).ready(function () {
	listing();
});

function listing() {
	fetch("/apt")
		.then((res) => res.json())
		.then((data) => {
			$("#cards").empty();
			let results = data["apt_info"];
			results.forEach((a) => {
				let name = a["name"];
				let address = a["address"];
				let price = a["price"];
				let size = a["size"];
				let link = a["link"];
				let image = a["image"];
				let temp_html = `<div class="col">
                                    <div class="card h-100">
                                        <img
                                            src="${image}"
                                            class="card-img-top"
                                            alt="..."
                                        />
                                        <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                            <p class="card-subtitle mb-2 text-muted>${address}</p>
                                            <p class="card-text">${price}</p>
                                            <p class="aptsize">${size}</p>
                                            <a class="btn btn-primary" href="${link}" target="_blank" role="button" style="border: 0px; background-color: #046648;">VISIT</a>
                                        </div>
                                    </div>
                                </div>
                                `;
				$("#cards").append(temp_html);
			});
		});
}
