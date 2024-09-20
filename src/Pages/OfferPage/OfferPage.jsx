import "../OfferPage/OfferPage.css";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Offer = ({ token }) => {
  const [offer, setOffer] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--newvinted-back--ptd8p9px9d2y.code.run/offer/${id}`
        );
        console.log("Data", response.data);
        setOffer(response.data);
      } catch (error) {
        console.log("offer data catch", error.message);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>IsLoading</p>
  ) : (
    <main className="offerPage-main">
      <div className="container">
        <div className="offer-img">
          <img src={offer.product_image.secure_url} alt="" />
          <div className="offer-info">
            <div>
              <p>
                {offer.product_price.toFixed(2).toString().replace(".", ",")} €
              </p>
              {offer.product_details.map((detail, index) => {
                const Tab = Object.keys(detail);
                return (
                  <div key={index} className="detail-div">
                    <p>{Tab[0].toUpperCase()}</p>
                    <span>{detail[Tab[0]]}</span>
                  </div>
                );
              })}
            </div>
            <div className="detail-div2">
              <p>{offer.product_name}</p>
              <p>{offer.product_description}</p>
              <div className="detail-div3">
                <img src={offer.owner.account.avatar?.secure_url} alt="" />
                <p>{offer.owner.account.username}</p>
              </div>
              <div className="button-acheter">
                <button
                  onClick={() => {
                    navigate("/payment", {
                      state: {
                        title: offer.product_name,
                        price: offer.product_price,
                        id: id,
                        from: location.pathname,
                      },
                    });
                  }}
                >
                  Acheter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Offer;
