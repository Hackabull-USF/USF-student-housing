import "./App.css";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Cards from "./components/Cards";

function App() {
	return (
		<div className="App">
			<Header />
			<Cards />
		</div>
	);
}

export default App;
