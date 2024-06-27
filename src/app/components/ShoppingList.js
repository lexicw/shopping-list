"use client";

import React, { useState, useEffect } from 'react';
import AddItemForm from './AddItemForm';
import ShoppingItem from './ShoppingItem';

const ShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    setItems([...items, { name: item, bought: false }]);
  };

  const toggleItemBought = (index) => {
    const newItems = [...items];
    newItems[index].bought = !newItems[index].bought;
    setItems(newItems);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="bg-white border-solid border-2 border-gray-300 pt-6 px-6 pb-8">
      <h1 className='text-3xl pb-4 font-bold'>Shopping List</h1>
      <AddItemForm addItem={addItem} />
      <ul className="w-full">
        {items.map((item, index) => (
          <ShoppingItem
            key={index}
            item={item}
            toggleItemBought={() => toggleItemBought(index)}
            deleteItem={() => deleteItem(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;