import "../Signup/SignupPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      return setMessage("Merci de remplir tous les champs requis");
    }
    if (password.length < 7) {
      return setMessage("Mot de passe trop court");
    }

    try {
      const { data } = await axios.post(
        "https://site--newvinted-back--ptd8p9px9d2y.code.run/user/signup/",
        {
          username,
          email,
          password,
          newsletter,
        }
      );

      setMessage("Votre compte a été créé");
      console.log("signup - response", data);
      Cookies.set("userToken", data.token, { secure: true });
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log("signupPage - catch", error.response);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Une erreur s'est produite");
      } else {
        setMessage("Une erreur s'est produite");
      }
    }
  };

  return (
    <main className="signup-main">
      <div className="signup-div">
        <h1>S'inscrire</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setMessage("");
              setUserName(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setMessage("");
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setMessage("");
              setPassword(event.target.value);
            }}
          />
          <div className="message">{message && <p>{message}</p>}</div>

          <div className="checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              className="check"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <p>S'inscrire à notre newsletter</p>
          </div>
          <div className="checkbox-p">
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <div className="signup-link">
            <button type="submit">S'inscrire</button>
            <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
