import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Characters from "./pages/characters/Characters";
import Comics from "./pages/comics/Comics";
import SingleChar from "./pages/singleChar/SingleChar";
import SingleComic from "./pages/singleComic/SingleComic";
import Favorites from "./pages/favorites/Favorites";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  return (
    <Router>
      <Header userToken={userToken} setUserToken={setUserToken} />
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
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/signup"
          element={<Signup userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route
          path="/login"
          element={<Login userToken={userToken} setUserToken={setUserToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
