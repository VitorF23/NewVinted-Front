import "../PublishPage/PublishPage.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const PublishPage = ({ token }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [prix, setPrix] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !title ||
      !image ||
      !article ||
      !marque ||
      !taille ||
      !couleur ||
      !etat ||
      !lieu ||
      !prix
    ) {
      return setErrorMessage("Veuillez compléter tous les champs");
    }
    const formData = new FormData();
    formData.append("picture", image);
    formData.append("title", title);
    formData.append("description", article);
    formData.append("brand", marque);
    formData.append("size", taille);
    formData.append("color", couleur);
    formData.append("condition", etat);
    formData.append("city", lieu);
    formData.append("price", prix);

    try {
      const { data } = await axios.post(
        "https://site--newvinted-back--ptd8p9px9d2y.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log("catch", error.response);
    }
  };

  return token ? (
    <main className="main-article">
      <div>
        <h1>Vends ton article</h1>
      </div>
      <form className="main-div" onSubmit={handleSubmit}>
        <div className="main-div-div">
          <label htmlFor="image" className="image">
            <p>
              <span>+ </span> Ajoute une photo
            </p>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          {image && <img src={URL.createObjectURL(image)} alt="" />}
        </div>
        <div>
          <div className="input-title">
            <label>
              Titre{" "}
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="description-input">
            <label>
              Décris ton article
              <input
                type="text"
                id="description"
                name="description"
                placeholder="ex: porté quelquefois,taille correctement"
                onChange={(event) => {
                  setArticle(event.target.value);
                }}
              />
            </label>
          </div>
        </div>
        <div className="info">
          <div className="description-div">
            <label>
              Marque
              <input
                type="text"
                id="description-info"
                name="description-marque"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setMarque(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="description-div">
            <label>
              Taille
              <input
                type="text"
                id="description-info"
                name="description-taille"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setTaille(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="description-div">
            <label>
              Couleur
              <input
                type="text"
                id="description-info"
                name="description-couleur"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setCouleur(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="description-div">
            <label>
              Etat
              <input
                type="text"
                id="description-info"
                name="description-etat"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setEtat(event.target.value);
                }}
              />
            </label>
          </div>
          <div className="description-div">
            <label>
              Lieu
              <input
                type="text"
                id="description-info"
                name="description-lieu"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setLieu(event.target.value);
                }}
              />
            </label>
          </div>
        </div>
        <div className="div-prix">
          <div>
            <h1>Prix</h1>
          </div>
          <div>
            <input
              type="number"
              step="0.01"
              id="prix"
              name="description-prix"
              placeholder="0,00 €"
              onChange={(event) => {
                setPrix(event.target.value);
              }}
            />
            <div className="checkbox">
              <input type="checkbox" id="checkbox" />
              <p>Je suis intéressé(e)par les échanges</p>
            </div>
          </div>
        </div>
        <div className="message">{errorMessage && <p>{errorMessage}</p>}</div>

        <div className="button-ajouter">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default PublishPage;
