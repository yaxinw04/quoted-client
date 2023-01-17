import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function HomePage() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const currUser = useContext(UserContext);

  return (
    <div className="container">
      <h1 className="title">Quoted.</h1>
      <p className="text" id="slogan">
        One sentence; one moment.
      </p>
      <form
        id="quotebox"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const url = process.env.REACT_APP_SERVER_URL + "/quotes";
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              quote, // shorthand for quote: quote
              user: currUser,
            }),
          });
          setLoading(false);
          setQuote("");
          if (response.ok) {
            setSuccess(true);
          }
        }}
      >
        <textarea
          className="textbox"
          rows={10}
          placeholder="Enter here"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        ></textarea>
        <button className="button" type="submit" disabled={loading}>
          Submit
        </button>
        {success ? <p>Thanks for your submission!</p> : null}
      </form>
      <p className="text" id="prompt">
        Enter your authentic thoughts, prayers, wishes, and aspirations, and
        Quoted will store them for you. When you want to remember, Quoted will
        show you a sentence – a fragment – of what you felt that day; giving you
        only a glimpse of your genuine feelings through the power of words.
      </p>
      <Link to="/generate" className="button">
        Generate Quote!
      </Link>
    </div>
  );
}

export default HomePage;
