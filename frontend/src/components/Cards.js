import "../App.css";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Hover from "./Hover";
import Container from "./Container";

const Cards = () => {
	const [apts, setApts] = useState([{}]);
	const [selectedApts, setSelectedApts] = useState([{}]);
	console.log(selectedApts);

	useEffect(() => {
		fetch("/apt")
			.then((res) => res.json())
			.then((data) => {
				setApts(data["apt_info"]);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Container>
				<Button
					onClick={() => {setSelectedApts([])}}
					id="clearBtn"
					variant="primary"
					style={{
						border: "0px",
						backgroundColor:
							"#828489",
						marginLeft: "10px",
					}}
				>
					CLEAR
				</Button>
				<div className="mycards">
					<div
						id="cards"
						className="row row-cols-1 row-cols-md-4 g-4"
					>
						{selectedApts.map((a) => {
							let card = a["card_info"];
							let name, address, size, image, link, price;
							try {
								name = card["name"];
								address = card["address"];
								size = card["size"];
								image = card["image"];
								link = card["link"];
								price = card["price"];

								return (
									<div className="col">
										<Card
											style={{
												height: "30rem",
												width: "18rem",
											}}
										>
											<Card.Img
												style={{
													width: 287,
													height: 200,
												}}
												variant="top"
												src={image}
											/>
											<Card.Body>
												<Card.Title>{name}</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">
													{address}
												</Card.Subtitle>
												<Card.Text>{price}</Card.Text>
												<Card.Text>{size}</Card.Text>
												<Button
													variant="primary"
													href={link}
													style={{
														border: "0px",
														backgroundColor:
															"#F95738",
													}}
												>
													VISIT
												</Button>
												<Hover position={address} />
											</Card.Body>
										</Card>
									</div>
								);
							} catch {
								console.log("err");
							}
						})}
					</div>
				</div>
			</Container>

			<div className="mycards">
				<div id="cards" className="row row-cols-1 row-cols-md-4 g-4">
					{apts.map((a) => {
						let id = a["id"];
						let name = a["name"];
						let address = a["address"];
						let price = a["price"];
						let size = a["size"];
						let link = a["link"];
						let image = a["image"];
						let details = a["details"];

						let card_info = {
							id: id,
							name: name,
							address: address,
							price: price,
							size: size,
							link: link,
							image: image,
							details: details,
						};

						return (
							<div className="col">
								<Card
									style={{ height: "30rem", width: "18rem" }}
								>
									<Card.Img
										style={{ width: 287, height: 200 }}
										variant="top"
										src={image}
									/>
									<Card.Body>
										<Card.Title>{name}</Card.Title>
										<Card.Subtitle className="mb-2 text-muted">
											{address}
										</Card.Subtitle>
										<Card.Text>{price}</Card.Text>
										<Card.Text>{size}</Card.Text>
										<Button
											variant="primary"
											href={link}
											style={{
												border: "0px",
												backgroundColor: "#046648",
											}}
										>
											VISIT
										</Button>
										<Hover position={address} />
										<Button
											onClick={() => {
												setSelectedApts(
													(selectedApts) => [
														...selectedApts,
														{ card_info },
													]
												);
											}}
											variant="primary"
											style={{
												border: "0px",
												backgroundColor: "#475B5A",
												marginLeft: "10px",
											}}
										>
											SELECT
										</Button>
									</Card.Body>
								</Card>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Cards;
