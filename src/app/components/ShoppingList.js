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
    <div>
            <h1 className='text-2xl font-bold bg-white w-fit py-3 px-6 border-r-4 border-indigo-500 inline-block'>Shopping List</h1>
            <button className='inline-block px-6 pt-1 text-4xl'>+</button>
    <div className="border-b-2 border-gray-300 pt-6 px-6 pb-6 bg-white">
      
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
    </div>
  );
};

export default ShoppingList;