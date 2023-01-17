import { useState } from "react";
import { Link } from "react-router-dom";

function QuotePage() {
  const [quoteObj, setQuoteObj] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="container">
      <h1 className="title">Quoted.</h1>
      <p className="text" id="slogan">
        One sentence; one moment.
      </p>
      {quoteObj !== null ? (
        quoteObj.hasOwnProperty("error") ? (
          <p>Oh no! There are no quotes yet.</p>
        ) : (
          <p>
            {quoteObj.quote} by {quoteObj.user} at{" "}
            {new Date(Date.parse(quoteObj.created)).toLocaleString()}
          </p>
        )
      ) : null}
      <button
        className="button"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL + "/quotes/generate"
          );
          setLoading(false);
          setQuoteObj(await response.json());
        }}
      >
        Generate
      </button>
      <Link to="/" className="button">
        Submit more entries!
      </Link>
    </div>
  );
}

export default QuotePage;
