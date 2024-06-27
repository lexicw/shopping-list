"use client";

import React from 'react';

const ShoppingItem = ({ item, toggleItemBought, deleteItem }) => {
  return (
    <li className="flex items-center justify-between px-2">
      <span
        style={{ textDecoration: item.bought ? 'line-through' : 'none' }}
        onClick={toggleItemBought} className='text-lg'
      >
        {item.name}
      </span>
      <button onClick={deleteItem} className="px-4 mx-1 py-2 text-3xl float-end">×</button>
    </li>
  );
};

export default ShoppingItem;