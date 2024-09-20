import "../components/Header.css";
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = ({ token, setToken, setSearch, sortPrice, setSortPrice }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const children = [
    <ToggleButton value="justify" key="justify">
      <MenuIcon />
    </ToggleButton>,
  ];

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

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
        <div className="menu-toggle" onClick={toggleMenu}>
          <Button onClick={handleOpen}>
            {" "}
            <Stack spacing={2} sx={{ alignItems: "center" }}>
              <ToggleButtonGroup
                size="small"
                {...control}
                aria-label="Small sizes"
              >
                {children}
              </ToggleButtonGroup>
            </Stack>
          </Button>
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
      <nav className={menuOpen ? "open" : ""}>
        {token ? (
          <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <button
                    className="button-deconnecter"
                    onClick={() => {
                      Cookies.remove("userToken");
                      setToken("");
                      navigate("/");
                      setMenuOpen(!menuOpen);
                      setOpen(!open);
                    }}
                  >
                    Se déconnecter
                  </button>
                  <button
                    onClick={() => {
                      if (token) {
                        navigate("/publish");
                        setOpen(!open);
                      } else {
                        navigate("/login", { state: { from: "/publish" } });
                        setMenuOpen(!menuOpen);
                      }
                    }}
                  >
                    Vends des articles
                  </button>
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
                </Typography>
              </Box>
            </Modal>
            <button
              className="button-deconnecter"
              onClick={() => {
                Cookies.remove("userToken");
                setToken("");
                navigate("/");
                setMenuOpen(!menuOpen);
              }}
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMenuOpen(!menuOpen);
                      setOpen(!open);
                    }}
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => {
                      if (token) {
                        navigate("/publish");
                      } else {
                        navigate("/login", { state: { from: "/publish" } });
                        setMenuOpen(!menuOpen);
                        setOpen(!open);
                      }
                    }}
                  >
                    Vends des articles
                  </button>
                </Typography>
              </Box>
            </Modal>
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(!menuOpen);
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
              setMenuOpen(!menuOpen);
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
