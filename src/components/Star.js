import React from "react";
import { AiFillStar } from "react-icons/ai";

const Star = ({ star }) => {
  const fill = new Array(parseInt(star)).fill(0);
  return (
    <>
      {fill.map((stars, index) => {
        return <AiFillStar key={index} />;
      })}
    </>
  );
};

export default Star;
