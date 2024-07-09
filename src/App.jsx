import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
  faCircleArrowUp,
  faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faListAlt, faCircleArrowUp, faCircleArrowDown);

import Header from "./components/Header";
import HomePage from "./Pages/HomePage/HomePage";
import Offer from "./Pages/OfferPage/OfferPage";
import SignupPage from "./Pages/Signup/SignupPage";
import LoginPage from "./Pages/Login/LoginPage";
import PublishPage from "./Pages/PublishPage/PublishPage";
import Payment from "./Pages/Payment/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken" || ""));
  const [dataInfo, setDataInfo] = useState();
  const [search, setSearch] = useState("");
  const [sortPrice, setSortPrice] = useState(false);

  return (
    <>
      <main className="App">
        <Router>
          <Header
            token={token}
            setToken={setToken}
            dataInfo={dataInfo}
            search={search}
            setSearch={setSearch}
            sortPrice={sortPrice}
            setSortPrice={setSortPrice}
          />
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  dataInfo={dataInfo}
                  setDataInfo={setDataInfo}
                  search={search}
                  sortPrice={sortPrice}
                  setSortPrice={setSortPrice}
                  token={token}
                />
              }
            />
            <Route path="/offer/:id" element={<Offer token={token} />} />
            <Route
              path="/signup"
              element={<SignupPage setToken={setToken} />}
            />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/publish" element={<PublishPage token={token} />} />
            <Route path="/payment" element={<Payment token={token} />} />
          </Routes>
        </Router>
      </main>
    </>
  );
}

export default App;
