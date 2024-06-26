"use client";

import React from 'react';

const ShoppingItem = ({ item, toggleItemBought, deleteItem }) => {
  return (
    <li>
      <span
        style={{ textDecoration: item.bought ? 'line-through' : 'none' }}
        onClick={toggleItemBought}
      >
        {item.name}
      </span>
      <button onClick={deleteItem}>Delete</button>
    </li>
  );
};

export default ShoppingItem;