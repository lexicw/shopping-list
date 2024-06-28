// src/components/ShoppingList.js
"use client";

import React, { useState, useEffect } from 'react';
import AddItemForm from './AddItemForm';
import ShoppingItem from './ShoppingItem';
import Tabs from './Tabs';

const ShoppingList = () => {
  const [lists, setLists] = useState([
    { name: 'Shopping List', items: [] },
  ]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [
      { name: 'Shopping List', items: [] },
    ];
    setLists(storedLists);
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const addItem = (listIndex, item) => {
    const newLists = [...lists];
    newLists[listIndex].items.push({ name: item, bought: false });
    setLists(newLists);
  };

  const toggleItemBought = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items[itemIndex].bought = !newLists[listIndex].items[itemIndex].bought;
    setLists(newLists);
  };

  const deleteItem = (listIndex, itemIndex) => {
    const newLists = [...lists];
    newLists[listIndex].items = newLists[listIndex].items.filter((_, i) => i !== itemIndex);
    setLists(newLists);
  };

  const addList = () => {
    const newLists = [...lists, { name: `Shopping List ${lists.length + 1}`, items: [] }];
    setLists(newLists);
  };

  const updateListName = (listIndex, newName) => {
    const newLists = [...lists];
    newLists[listIndex].name = newName;
    setLists(newLists);
  };

  const tabs = lists.map((list, listIndex) => ({
    label: list.name,
    content: (
      <div>
        <div className="border-b-2 border-gray-300 pt-6 px-6 pb-6 bg-white">
          <AddItemForm addItem={(item) => addItem(listIndex, item)} />
          <ul className="w-full">
            {list.items.map((item, itemIndex) => (
              <ShoppingItem
                key={itemIndex}
                item={item}
                toggleItemBought={() => toggleItemBought(listIndex, itemIndex)}
                deleteItem={() => deleteItem(listIndex, itemIndex)}
              />
            ))}
          </ul>
        </div>
      </div>
    ),
  }));

  return (
    <div className='container w-full lg:w-1/2 mx-auto lg:mt-4'>
      <Tabs tabs={tabs} addList={addList} updateListName={updateListName} />
    </div>
  );
};

export default ShoppingList;
