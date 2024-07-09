import "../components/Hero.css";
import image from "../img/preview.jpg";
import { useNavigate } from "react-router-dom";

const Hero = ({ token }) => {
  const navigate = useNavigate();

  const button = () => {
    if (token) {
      navigate("/publish ");
    } else {
      navigate("/login", { state: { from: "/publish" } });
    }
  };

  return (
    <div className="hero">
      <img src={image} alt="" />
      <div>
        <p>Prêts à faire du tri dans vos placards ?</p>
        <div className="hero-button">
          <button onClick={button}>Commencer a vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
