import "../Signup/SignupPage.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return setMessage("Merci de remplir tous les champs requis");
    }

    try {
      const { data } = await axios.post(
        "https://site--newvinted-back--ptd8p9px9d2y.code.run/user/login/",
        {
          email,
          password,
        }
      );

      console.log("signup - response", data);
      Cookies.set("userToken", data.token, { secure: true });
      setToken(data.token);

      if (location.state) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("signupPage - catch", error.response);
      if (error.response && error.response.data) {
        setMessage(error.response.data || "Une erreur s'est produite");
      } else {
        setMessage("Une erreur s'est produite");
      }
    }
  };

  return (
    <main className="signup-main">
      <div className="signup-div">
        <h1>Se connecter</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="message">{message && <p>{message}</p>}</div>

          <div className="signup-link">
            <button type="submit">Se connecter</button>
            <Link to="/signup">Pas encore de compte ? Inscris-toi!</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
