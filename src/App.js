import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./HomePage";
import QuotePage from "./QuotePage";

import { UserContext } from "./UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "generate",
    element: <QuotePage />,
  },
]);

const users = ["Yaxin", "Maggie", "Ian"];

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const oldUser = localStorage.getItem("user");
    if (oldUser !== null) {
      setUser(oldUser);
    }
  }, []);

  // user has not yet been selected
  if (user === null) {
    return (
      <div className="selectorContainer">
        <div>Select a user:</div>
        {users.map((u) => (
          <button
            className="button"
            onClick={() => {
              setUser(u);
              localStorage.setItem("user", u);
            }}
          >
            {u}
          </button>
        ))}
      </div>
    );
  }

  // user has been selected
  return (
    <UserContext.Provider value={user}>
      <div className="userDisplay">
        <div>{user}</div>
        <button
          className="button"
          onClick={() => {
            setUser(null);
            localStorage.removeItem("user");
          }}
        >
          Change User
        </button>
      </div>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
