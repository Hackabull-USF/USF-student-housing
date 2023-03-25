import "../App.css";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Cards = () => {
	const [apts, setApts] = useState([{}]);

	useEffect(() => {
		fetch("/apt")
			.then((res) => res.json())
			.then((data) => {
				setApts(data["apt_info"]);
				console.log(apts);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="mycards">
			<div id="cards" className="row row-cols-1 row-cols-md-4 g-4">
				{apts.map((a) => {
					return (
						<div className="col">
							<Card style={{ height:"30rem", width: "18rem" }}>
								<Card.Img
									style={{ width: 287, height: 200 }}
									variant="top"
									src={a["image"]}
								/>
								<Card.Body>
									<Card.Title>{a["name"]}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">
										{a["address"]}
									</Card.Subtitle>
									<Card.Text>{a["price"]}</Card.Text>
									<Card.Text>{a["size"]}</Card.Text>
									<Button
										variant="primary"
										href={a["link"]}
										style={{
											border: "0px",
											backgroundColor: "#046648",
										}}
									>
										VISIT
									</Button>
								</Card.Body>
							</Card>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Cards;
