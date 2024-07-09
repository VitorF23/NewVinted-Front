// src/CheckoutForm.jsx
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ id, price, title }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: id,
    });
    console.log(stripeResponse);

    if (stripeResponse.error) {
      setErrorMessage(stripeResponse.error.message);
      return;
    }

    const stripeToken = stripeResponse.token.id;

    try {
      const response = await axios.post(
        "https://site--newvinted-back--ptd8p9px9d2y.code.run/payment",
        {
          stripeToken,
          price,
          title,
        }
      );
      console.log("checkoutForm reponseData", response.data);

      if (response.data.status === "succeeded") {
        setCompleted(true);
      } else {
        setErrorMessage(response.data.status);
      }
    } catch (error) {
      console.log("signupPage - catch", error.response);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" className="button-valider-cardElement">
            Valider
          </button>
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
      ) : (
        <span className="text">Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
