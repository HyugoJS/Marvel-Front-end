import "../signup/Signup.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ userToken, setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-back--fc7nwyvb2r4r.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      //   console.log("ici=>", response.data);
      if (response.data) {
        Cookies.set("token", response.data);
        navigate("/");
        setUserToken(response.data);
      }
      return "ici=>" + response.data.token;
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Se connecter</h1>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleEmail}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handlePassword}
          value={password}
        />

        <input type="submit" value="Se connecter" className="submit-button" />
        <Link className="form-link" to={"/signup"}>
          Inscrivez-vous
        </Link>
      </div>
    </form>
  );
};
export default Login;
