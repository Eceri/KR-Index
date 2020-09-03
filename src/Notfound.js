import React, { useGlobal } from "reactn";
import { NavLink } from "react-router-dom";

// Relative imports
import { ErrorState } from "Constants";

export const Notfound = () => {
  const [error, setError] = useGlobal("error");

  return (
    <div style={{ textAlign: "center", marginTop: "8rem" }}>
      <h1 style={{ marginBottom: "3rem" }}>Something went wrong!</h1>
      <NavLink to="/" onClick={() => setError(ErrorState)}>
        Back to landing page
      </NavLink>
    </div>
  );
};
