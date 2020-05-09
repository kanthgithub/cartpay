import React, { Component } from "react";

const EmptyCart = props => {
  return (
    <div className="empty-cart">
      <img
        src="https://res.cloudinary.com/lakshmikanth/image/upload/v1589050645/empty-cart_ehdlia.png"
        alt="empty-cart"
      />
      <h2>You cart is empty!</h2>
    </div>
  );
};

export default EmptyCart;
