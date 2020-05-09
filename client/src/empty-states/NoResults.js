import React, { Component } from "react";

const NoResults = () => {
  return (
    <div className="products">
      <div className="no-results">
        <img
          src="https://res.cloudinary.com/lakshmikanth/image/upload/v1589050645/bare-tree_phh1m6.png"
          alt="Empty Tree"
        />
        <h2>Sorry, no products matched your search!</h2>
        <p>Enter a different keyword and try.</p>
      </div>
    </div>
  );
};

export default NoResults;
