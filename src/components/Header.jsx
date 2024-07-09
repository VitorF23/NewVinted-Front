import "../components/Header.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setToken, setSearch, sortPrice, setSortPrice }) => {
  const navigate = useNavigate();

  return (
    <main className="main-header">
      <div className="Logo">
        <Link to={"/"}>
          <img src={logo} alt="logo-vinted" />
        </Link>
        <div className="input">
          <input
            type="text"
            placeholder="Recherche des articles"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <div className="tri-prix">
        <p>Trier par prix :</p>
        <div
          onClick={() => {
            setSortPrice(!sortPrice);
          }}
        >
          <div>
            <span>
              {sortPrice ? (
                <FontAwesomeIcon icon="fa-solid fa-circle-arrow-down" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-circle-arrow-up" />
              )}
            </span>
          </div>
        </div>
      </div>
      <nav className="header-button">
        {token ? (
          <button
            className="button-deconnecter"
            onClick={() => {
              Cookies.remove("userToken");
              setToken("");
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              S`incrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </>
        )}
        <button
          onClick={() => {
            if (token) {
              navigate("/publish");
            } else {
              navigate("/login", { state: { from: "/publish" } });
            }
          }}
        >
          Vends des articles
        </button>
      </nav>
    </main>
  );
};

export default Header;
