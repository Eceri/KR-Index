import React from "react";

export const stars = setStar => {
  const arr = [0, 1, 2, 3, 4, 5];
  return (
    <div>
      {arr.map(v => (
        <button onClick={() => setStar(v)}>{v}</button>
      ))}
    </div>
  );
};
