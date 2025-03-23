// faire un state pour dire si on est connecté ou non (true false)
//faire une fonction handlesubmit que je met dans le on click, qui va faire la requete axios vers l'API (event.preventdefault)
// handleusername =(even)=>{setData(...data), username :event.target.value}
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    favorites: [""],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://site--marvel-back--fc7nwyvb2r4r.code.run/user/signup",
        data
      );
      console.log(response.data);
      if (response.data.token) {
        Cookies.set("token", response.data.token);
        setUserToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log("ici=>", error.response);
      if (error.response && error.response.status === 409) {
        setErrorMessage("This email is already taken.");
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };
  const handleUsername = (event) => {
    setData({
      ...data,
      username: event.target.value,
    });
  };
  const handleEmail = (event) => {
    setData({
      ...data,
      email: event.target.value,
    });
  };
  const handlePassword = (event) => {
    setData({
      ...data,
      password: event.target.value,
    });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={handleUsername}
            value={data.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleEmail}
            value={data.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handlePassword}
            value={data.password}
          />

          <input type="submit" value="S'inscrire" className="submit-button" />
          <Link className="form-link" to={"/login"}>
            Connectez-vous
          </Link>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};
export default Signup;
