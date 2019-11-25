import React from "react";

export const Home = () => {
  return (
    <React.Fragment>
      <div>
        <h1 style={{textAlign: "center"}}>Welcome to KRC</h1>
        <p></p>
        <div>
          Currently working on:
          <ul>
            <li>Adding hero data to the DB</li>
            <li>Artifacts?</li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
