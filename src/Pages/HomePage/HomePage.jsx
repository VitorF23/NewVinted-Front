import "../HomePage/HomePage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Hero from "../../components/Hero";

const HomePage = ({ dataInfo, setDataInfo, search, sortPrice, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--newvinted-back--ptd8p9px9d2y.code.run/offers?title=${search}&sort=${
            sortPrice ? "price-desc" : "price-asc"
          }&page=${page}`
        );
        console.log(response.data);
        setDataInfo(response.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Home catch", error.response);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [search, sortPrice, page, setDataInfo]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return isLoading ? (
    <Box className="circularProgress" sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <div className="containerMain">
        <Hero token={token} />
        {dataInfo.offers.map((offer) => {
          const avatarUrl = offer.owner.account?.avatar?.secure_url;
          return (
            <Link to={`/offer/${offer._id}`} key={offer._id} className="offer">
              <div className="avatar">
                {avatarUrl ? <img src={avatarUrl} alt="avatar" /> : <></>}
                <p>{offer.owner.account.username}</p>
              </div>
              <img src={offer.product_image.secure_url} alt="" />
              <p>
                {offer.product_price.toFixed(2).toString().replace(".", ",")} €
              </p>
              <p className="offer-p">{offer.product_name}</p>
            </Link>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage}>Page précédente</button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button onClick={handleNextPage}>Page suivante</button>
      </div>
    </>
  );
};

export default HomePage;
