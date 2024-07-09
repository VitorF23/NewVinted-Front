import "../Payment/Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useLocation, Navigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Ofky3HgGsgIhLn7M25JnL5DBF8Zx8JsWEugy7EbOn8GJUYXSlyazl7VfzQ3JooJAGXW8o6DiqYJDRNLpOJYlsAt00iudnZHGV"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, price, id } = location.state;
  const fraisProtection = Number(0.4);
  const fraisPort = Number(0.8);
  const totalPrice = (price + fraisProtection + fraisPort).toFixed(2);

  return token ? (
    <div className="div-payment">
      <Elements stripe={stripePromise}>
        <div>
          <div>
            <p>Résumé de la commande</p>
          </div>
          <div>
            <p>Commande </p>
            <span>{price} €</span>
          </div>
          <div>
            <p>Frais protection acheteurs </p>
            <span>{fraisProtection}0 €</span>
          </div>
          <div>
            <p>Frais de Port </p>
            <span>{fraisPort}0 €</span>
          </div>
          <div>
            <strong>Total</strong>
            <strong>{totalPrice} €</strong>
          </div>
          <div>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir{" "}
              <strong>{title}</strong>. Vous allez payer{" "}
              <strong>{totalPrice} </strong>
              €(frais de protection et frais de port inclus)
            </p>
          </div>
          <div>
            <CheckoutForm id={id} price={price} title={title} />
          </div>
        </div>
      </Elements>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location.state.from }} />
  );
};

export default Payment;
