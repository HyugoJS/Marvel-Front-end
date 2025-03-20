import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Characters from "./pages/characters/Characters";
import Comics from "./pages/comics/Comics";
import SingleChar from "./pages/singleChar/SingleChar";
import SingleComic from "./pages/singleComic/SingleComic";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/comics"
          element={<Comics title={title} setTitle={setTitle} />}
        />
        <Route path="/comics/:id" element={<SingleComic />} />
        <Route
          path="/characters"
          element={<Characters name={name} setName={setName} />}
        />
        <Route path="/characters/:id" element={<SingleChar />} />
      </Routes>
    </Router>
  );
}

export default App;
